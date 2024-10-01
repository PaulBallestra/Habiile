import Route, { Access } from './Route'
import { Types } from '../utils/types'
import { sentEmail } from '../utils/email'
import { NEW_MESSAGE_EMAIL_CLIENT, NEW_MESSAGE_EMAIL_ADMIN } from '../constants/emailTemplates'
import config from 'config'

export default class RouteMessages extends Route {
  constructor (params) {
    super({ ...params, model: 'messages' })
  }

  @Route.Get({
    accesses: [Access.isAdmin],
  })
  async getAllMessages (ctx) {
    const messages = await this.model.getAllMessages()

    this.sendOk(ctx, messages)
  }

  @Route.Post({
    bodyType: Types.object().keys({
      email: Types.string().required(),
      lastName: Types.string().required(),
      firstName: Types.string().required(),
      phoneNumber: Types.string(),
      message: Types.string().required(),
    }),
  })
  async createMessage (ctx) {
    try {
      await this.model.createMessage(this.body(ctx))

      const { firstName, lastName, email, phoneNumber, message } = this.body(ctx)

      // Email to client
      var to = {
        email: email,
        name: firstName + ' ' + lastName,
      }
      var templateId = NEW_MESSAGE_EMAIL_CLIENT
      var params = { 
        lastname: lastName ? lastName : '',
        firstname: firstName ? firstName : '',
        surname: '',
      }
      await sentEmail(to, templateId, params)
  
      // Email to admin
  
      to = {
        email: config.adminEmail,
        name: config.adminName,
      }
      templateId = NEW_MESSAGE_EMAIL_ADMIN
      params = {
        lastname: lastName ? lastName : '',
        firstname: firstName ? firstName : '',
        phoneNumber,
        email,
        message,
      }
      await sentEmail(to, templateId, params)

      this.sendOk(ctx, 'OK')
    } catch (err) {
      ctx.throw(403, err)
    }
  }

  @Route.Put({
    bodyType: Types.object().keys({
      status: Types.string().required(),
      email: Types.string().required(),
      firstName: Types.string().required(),
      lastName: Types.string().required(),
      phoneNumber: Types.string(),
      message: Types.string().required(),
    }),
    path: 'update-message/:id',
    accesses: [Access.isAdmin],
  })
  async updateMessage (ctx) {
    const { id } = ctx.params
    const { status, email, firstName, lastName, phoneNumber, message } = this.body(ctx)

    await this.model.updateMessage({ id, status, email, firstName, lastName, phoneNumber, message })
    this.sendOk(ctx, 'OK')
  }

  @Route.Put({
    path: 'delete-message/:id',
    accesses: [Access.isAdmin],
  })
  async deleteMessage (ctx) {
    const { id } = ctx.params
    await this.model.deleteMessage({ id })
    this.sendOk(ctx, 'OK')
  }
}