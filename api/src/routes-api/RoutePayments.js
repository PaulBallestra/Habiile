import Route, { Access } from './Route'
import { Types } from '../utils/types'
import config from 'config'
import { CONFIRM_ORDER_ADMIN, CONFIRM_ORDER_CLIENT } from '../constants/emailTemplates'
import { sentEmail } from '../utils/email'
const stripe = require('stripe')(config.stripe)

export default class RoutePayments extends Route {
  constructor (params) {
    super({ ...params, model: 'items' })
  }

  @Route.Post({
    bodyType: Types.object().keys({
      price: Types.number().required(),
    }),
    accesses: [Access.isLogin],
  })
  async process (ctx) {
    const { price } = this.body(ctx)
    const customerId = await this.model.models.users.getStripeCustomerId(ctx.state.user.id)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100),
      currency: 'eur',
      payment_method_types: ['card'],
      customer: customerId,
    })
    const clientSecret = paymentIntent.client_secret
    this.sendOk(ctx, { clientSecret, customerId } )
  }

  // @Route.Post({
  //   bodyType: Types.object().keys({
  //     articleId: Types.number().required(),
  //   }),
  //   accesses: [Access.isLogin],
  // })
  // async confirm (ctx) {
  //   const { articleId } = this.body(ctx)
  //   const status = await this.model.confirmArticlePayment(articleId, ctx.state.user.id)
  //   this.sendOk(ctx, status)
  // }

  @Route.Get({
    path: 'details/:id',
    accesses: [Access.isLogin],
  })
  async details (ctx) {
    const { id } = ctx.params
    const status = await this.model.detailsPayments(id, ctx.state.user.id)
    this.sendOk(ctx, status)
  }

  // send confirm payment email
  @Route.Post({
    bodyType: Types.object().keys({
      itemTitle: Types.string().required(),
      price: Types.number().required(),
    }),
    accesses: [Access.isLogin],
  })
  async sendConfirmOrderEmail (ctx) {
    const { itemTitle, price } = this.body(ctx);
    try {
      const user = await this.model.models.users.getUserById(ctx.state.user.id);
      const userEmail = user.dataValues.email;
      const userFirstName = user.dataValues.first_name;
      const userLastName = user.dataValues.last_name;

      // Email to client
      var to = {
        email: userEmail,
        name: userFirstName + ' ' + userLastName,
      }
      var templateId = CONFIRM_ORDER_CLIENT
      var params = {
        name: userFirstName,
        surname: userLastName,
        itemTitle: itemTitle,
        price: price,
      }
      await sentEmail(to, templateId, params)

      // Email to admin
      to = {
        email: config.adminEmail,
        name: config.adminName,
      }
      templateId = CONFIRM_ORDER_ADMIN
      params = {
        name : 'admin',
        surname : 'admin',
        itemTitle: itemTitle,
        price: price,
      }
      await sentEmail(to, templateId, params)
      this.sendOk(ctx, 'OK')

    } catch (err) {
      ctx.throw(401, err);
    }
  }
}
