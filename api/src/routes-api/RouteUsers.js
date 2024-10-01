import Route, { Access } from './Route'
import { Types } from '../utils/types'
import { sentEmail } from '../utils/email'
import config from 'config'
import { ONBORDING_EMAIL_CLIENT, ONBORDING_EMAIL_ADMIN, 
  RESET_PASSWORD_EMAIL, CONFIRMATION_RESET_PWD_EMAIL,
  ACCOUNT_DELETION_EMAIL_CLIENT, ACCOUNT_DELETION_EMAIL_ADMIN,
  ACCOUNT_DELETION_BY_ADMIN_EMAIL_CLIENT, ACCOUNT_DELETION_BY_ADMIN_EMAIL_ADMIN,
  ACCOUNT_CREATED_BY_ADMIN_EMAIL_CLIENT, PASSWORD_UPDATED_BY_ADMIN_EMAIL_CLIENT,
  NEW_ADMINISTRATOR_EMAIL,
} from '../constants/emailTemplates'
import { PASSWORD_RESET_PAGE } from '../constants/pathToFront'
import { generatePasswordToken } from '../utils/crypto'
import { roleToId, USER_ROLE_ADMIN, USER_ROLE_USER } from '../constants/roles'
import { WRONG_EMAIL_OR_PASSWORD } from '../constants/errors'

export default class RouteUsers extends Route {
  constructor (params) {
    super({ ...params, model: 'users' })
  }

  @Route.Get()
  async me (ctx) {
    if (ctx.state && ctx.state.user) {
      const user = await this.model.userPreview(ctx.state.user.id)
      this.sendOk(ctx, user)
    } else {
      this.sendOk(ctx, null)
    }
  }

  @Route.Post({
    bodyType: Types.object().keys({
      email: Types.string().required(),
      password: Types.string().required(),
      firstName: Types.string().required(),
      lastName: Types.string().required(),
      phoneNumber: Types.string(),
    }),
  })
  async createAccount (ctx) {
    try {
      await this.model.createAccount(this.body(ctx))
 
      const { email, firstName, lastName } = this.body(ctx)

      // Email to client
      var to = {
        email: email,
        name: firstName + ' ' + lastName,
      }
      var templateId = ONBORDING_EMAIL_CLIENT
      var params = {
        name: firstName,
        surname: lastName,
      }
      await sentEmail(to, templateId, params)

      // Email to admin

      to = {
        email: config.adminEmail,
        name: config.adminName,
      }
      templateId = ONBORDING_EMAIL_ADMIN
      params = {
        name : 'admin',
        surname : 'admin',
      }
      await sentEmail(to, templateId, params)
      this.sendOk(ctx, 'OK')

    } catch (err) {
      ctx.throw(401, ctx.state.__(err))
    }
  }

  @Route.Put({
    bodyType: Types.object().keys({
      email: Types.string().required(),
      password: Types.string().required(),
    }),
    accesses: [Access.isLogin]
  })
  async deleteAccount (ctx) {
    // find current user
    const currentUser = await this.model.getUserById(ctx.state.user.id);
    const { email } = this.body(ctx)
    // verify if the email of the current user is the same as the email inserted in the deletion form
    if(currentUser.dataValues.email === email) {
      try {
        await this.model.deleteAccount(this.body(ctx))
  
        // Email to client
        var to = {
          email: email,
          name: '',
        }
        var templateId = ACCOUNT_DELETION_EMAIL_CLIENT
        var params = { 
          name: '',
          surname: '',
        }
        await sentEmail(to, templateId, params)
  
        // Email to admin
  
        to = {
          email: config.adminEmail,
          name: config.adminName,
        }
        templateId = ACCOUNT_DELETION_EMAIL_ADMIN
        params = {
          name : 'admin',
          surname : 'admin',
        }
        await sentEmail(to, templateId, params)
        this.sendOk(ctx, 'OK')  
      } catch (err) {
        ctx.throw(401, ctx.state.__(err))
      }
    }else {
      ctx.throw(401, ctx.state.__(WRONG_EMAIL_OR_PASSWORD))
    }
  }

  @Route.Get({
    path: 'lost-password/:email',
  })
  async lostPassword (ctx) {
    const { email } = ctx.params
    let new_password_token = null

    new_password_token = await generatePasswordToken()

    while (await this.model.searchPasswordToken({ new_password_token })) 
      new_password_token = await generatePasswordToken()

    try {
      const user = await this.model.searchUser({ email })
      await this.model.addPasswordToken({ id: user.dataValues.id, new_password_token: new_password_token })

      const to = {
        email,
        name: user.dataValues.first_name + ' ' + user.dataValues.last_name,
      }
      const templateId = RESET_PASSWORD_EMAIL
      const params = {
        name: user.dataValues.first_name + ' ' + user.dataValues.last_name,
        path: config.frontUrl + PASSWORD_RESET_PAGE,
        token: new_password_token,
      }
      await sentEmail(to, templateId, params)
      config.envName.trim() === '[TEST]' ? this.sendOk(ctx, { new_password_token }, 'OK') : this.sendOk(ctx, 'OK')
    } catch (err) {
      ctx.throw(401, ctx.state.__(err))
    }
  }

  @Route.Put({
    bodyType: Types.object().keys({
      new_password_token: Types.string().required(),
      email: Types.string().required(),
      password: Types.string().required(),
    }),
  })
  async resetPassword (ctx) {
    const { new_password_token, email, password } = this.body(ctx)

    try {
      await this.model.resetPassword({ new_password_token, email, password })
      const user = await this.model.searchUser({ email })
      const to = {
        email,
        surname: user.dataValues.first_name + ' ' + user.dataValues.last_name,
      }
      const templateId = CONFIRMATION_RESET_PWD_EMAIL
      const params = {
        name: user.dataValues.first_name + ' ' + user.dataValues.last_name,
      }

      await sentEmail(to, templateId, params)
      this.sendOk(ctx, 'Ok')
    } catch (err) {
      ctx.throw(401, ctx.state.__(err))
    }
  }

  @Route.Put({
    bodyType: Types.object().keys({
      email: Types.string(),
      firstName: Types.string(),
      lastName: Types.string(),
      phoneNumber: Types.string(),
    }),
    path: 'update-infos/:id',
    accesses: [Access.isLogin],
  })
  async updateInfos (ctx) {
    const { id } = ctx.params
    const { email, firstName, lastName, phoneNumber } = this.body(ctx)
    await this.model.updateInfos({ id, email, firstName, lastName, phoneNumber, image: ctx.request.files.profileImage })
    this.sendOk(ctx, 'OK')
  }

  @Route.Put({
    bodyType: Types.object().keys({
      newPassword: Types.string().required(),
    }),
    path: 'change-password/:id',
    accesses: [Access.isLogin],
  })
  async changePassword (ctx) {
    const { id } = ctx.params
    const { newPassword } = this.body(ctx)

    await this.model.updateInfos({ id, password: newPassword })
    this.sendOk(ctx, 'OK')
  }

  @Route.Put({
    path: 'delete-account-by-admin/:id',
    accesses: [Access.isAdmin], 
  })
  async deleteAccountByAdmin (ctx) {
    
    try {
      const { id } = ctx.params
      
      const tmp = await this.model.findOne({ where: { id } })
      const data = tmp.dataValues

      await this.model.deleteAccountByAdmin(id)
      // Email to client
      var to = {
        email: data.email,
        name: data.first_name + ' ' +  data.last_name,
      }
      var templateId = ACCOUNT_DELETION_BY_ADMIN_EMAIL_CLIENT
      var params = { 
        name: data.first_name + ' ' + data.last_name,
        surname: '',
      }
      await sentEmail(to, templateId, params)

      // Email to admin

      to = {
        email: config.adminEmail,
        name: config.adminName,
      }
      templateId = ACCOUNT_DELETION_BY_ADMIN_EMAIL_ADMIN
      params = {
        name : 'admin',
        surname : 'admin',
      }
      await sentEmail(to, templateId, params)
      this.sendOk(ctx, 'OK')
  
    } catch (err) {
      ctx.throw(401, ctx.state.__(err))
    }
  }

  @Route.Get({
    accesses: [Access.isAdmin],
  })
  async getAll (ctx) {
    const list = await this.model.getAll()
    this.sendOk(ctx,
      list,
    )
  }

  @Route.Put({
    bodyType: Types.object().keys({
      firstName: Types.string().required(),
      lastName: Types.string().required(),
      email: Types.string().required(),
      phoneNumber : Types.string(),
      roleName: Types.string().required(),
      password: Types.string(),
    }),
    path: 'update-user-by-admin/:id',
    accesses: [Access.isAdmin],
  })
  async updateUserByAdmin (ctx) {
    const { id } = ctx.params
    const { firstName, lastName, email, phoneNumber, roleName, password } = this.body(ctx)

    const old_infos = await this.model.getUserById(id)
    try {
      await this.model.updateUserByAdmin({ id, email, firstName, lastName, phoneNumber, roleName, password })

      var to = {
        email: '',
        name : '',
      }
      var templateId = -1
      var params = {}
      if (password) {
        // Email to client to inform the password has been changed and give him the new one
        to = {
          email: email,
          name: firstName + ' ' + lastName,
        }
        templateId = PASSWORD_UPDATED_BY_ADMIN_EMAIL_CLIENT
        params = {
          name: firstName,
          surname: lastName,
          tmp_password: password,
        }
        await sentEmail(to, templateId, params)
      }
      if (roleToId(roleName) ===  USER_ROLE_ADMIN && old_infos.dataValues.role === USER_ROLE_USER) {
        // Email to client to inform he has been defined as a new administrator
        to = {
          email: email,
          name: firstName + ' ' + lastName,
        }
        templateId = NEW_ADMINISTRATOR_EMAIL
        params = {
          name: firstName,
          surname: lastName,
        }
        await sentEmail(to, templateId, params)
      }
      this.sendOk(ctx, 'OK')      
    } catch (err) {
      ctx.throw(401, ctx.state.__(err))
    }
  }

  @Route.Post({
    bodyType: Types.object().keys({
      email: Types.string().required(),
      roleName: Types.string().required(),
      firstName: Types.string().required(),
      lastName: Types.string().required(),
      phoneNumber: Types.string(),
    }),
    accesses: [Access.isAdmin],
  })
  async createAccountByAdmin (ctx) {
    try {
      let new_password_token = null
      new_password_token = await generatePasswordToken()
      while (await this.model.searchPasswordToken({ new_password_token })) new_password_token = await generatePasswordToken()

      await this.model.createAccountByAdmin(this.body(ctx), new_password_token)
        .then(async (response) => {
          const { email, firstName, lastName } = this.body(ctx)

          // Email to client
          var to = {
            email: email,
            name: firstName + ' ' + lastName,
          }
          var templateId = ACCOUNT_CREATED_BY_ADMIN_EMAIL_CLIENT
          var params = {
            name: firstName,
            surname: lastName,
            tmp_password: new_password_token,
          }
          await sentEmail(to, templateId, params)
          this.sendOk(ctx, response, 'OK')
        })
    } catch (err) {
      ctx.throw(401, ctx.state.__(err))
    }
  }

}
