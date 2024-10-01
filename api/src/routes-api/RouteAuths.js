import Route from './Route'
import { crypt } from '../utils'
import { Types } from '../utils/types'
import { USER_ROLE_ADMIN } from '../constants/roles'
import { ACCOUNT_INACCESSIBLE, WRONG_EMAIL_OR_PASSWORD } from '../constants/errors'

export default class RouteAuths extends Route {
  constructor (params) {
    super({ ...params, model: 'users' })
  }

  @Route.Post({
    bodyType: Types.object().keys({
      email: Types.string().required(),
      password: Types.string().required(),
    }),
  })
  async login (ctx) {
    const { password } = this.body(ctx)
    let { email } = this.body(ctx)
    email = email.toLowerCase()

    const user = await this.model.findOne({ where: { email } })
    if (user && user.dataValues.status === 0) {
      ctx.throw(401, ctx.state.__(ACCOUNT_INACCESSIBLE))
    } else if (user && crypt.compartPassword(password, user.dataValues.password)) {
      delete user.dataValues.password

      await ctx.loginUser(user.dataValues)
      await super.addUserInfoInBody(ctx)
      this.sendCreated(ctx)
    } else {
      ctx.throw(401, ctx.state.__(WRONG_EMAIL_OR_PASSWORD))
    }
  }

  @Route.Post({
    bodyType: Types.object().keys({
      email: Types.string().required(),
      password: Types.string().required(),
    }),
  })
  async loginAdmin (ctx) {
    const { password } = this.body(ctx)
    let { email } = this.body(ctx)
    email = (email || '').toLowerCase()

    const user = await this.model.findOne({ where: { email, role: USER_ROLE_ADMIN } })
    if (user && user.dataValues.status === 0) {
      ctx.throw(401, ctx.state.__(ACCOUNT_INACCESSIBLE))
    } else if (user && crypt.compartPassword(password, user.dataValues.password)) {
      delete user.dataValues.password

      await ctx.loginUser(user.dataValues)
      await super.addUserInfoInBody(ctx)
      this.sendCreated(ctx)
    } else {
      ctx.throw(401, ctx.state.__(WRONG_EMAIL_OR_PASSWORD))
    }
  }

  @Route.Get({})
  async autoLogin (ctx) {
    if (this.userId(ctx)) {
      await super.addUserInfoInBody(ctx)
      this.sendOk(ctx)
    } else {
      this.sendOk(ctx)
    }
  }

  @Route.Get({})
  async getUserIfAuthenticated (ctx) {
    if (this.userId(ctx)) {
      await super.addUserInfoInBody(ctx)
      this.sendOk(ctx)
    } else {
      return null
    }
  }

  @Route.Get({})
  async autoLoginAdmin (ctx) {
    if (this.userId(ctx) && ctx.state.user.role === USER_ROLE_ADMIN) {
      await super.addUserInfoInBody(ctx)
      this.sendOk(ctx)
    } else {
      ctx.throw(401)
    }
  }

  @Route.Get({})
  async getAdminIfAuthenticated (ctx) {
    if (this.userId(ctx) && ctx.state.user.role === USER_ROLE_ADMIN) {
      await super.addUserInfoInBody(ctx)
      this.sendOk(ctx)
    } else {
      return null
    }
  }

  @Route.Get({})
  async logout (ctx) {
    await ctx.logoutUser()
  }
}
