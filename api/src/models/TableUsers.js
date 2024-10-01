import { roleToString, roleToId } from '../constants/roles'
import { snakeToCamelObject } from '../utils/utils'
import awsS3 from '../utils/AwsS3'
import { crypt } from '../utils'
import config from 'config'
import slugify from 'slugify'
import { USER_ROLE_USER } from '../constants/roles'
import { ACCOUNT_DOES_NOT_EXIST, EMAIL_ALREADY_EXISTS, EMAIL_DOES_NOT_CORRESPOND_TO_ANY_ACCOUNT, USER_DOES_NOT_EXIST, USER_NOT_FOUND, WRONG_PASSWORD } from '../constants/errors'

const stripe = require('stripe')(config.stripe)

export default (sequelizeInstance, Model) => {
  Model.userPreview = async (userId) => {
    const user = await Model.findOne({
      attributes: ['email', 'first_name', 'last_name', 'phone_number', 'id', 'image'],
      where: { id: userId },
      raw: true,
    })

    if (user) {
      return snakeToCamelObject(user)
    }

    return null
  }

  Model.createAccount = async ({ email, password, firstName, lastName, phoneNumber }) => {
    var user = await Model.findOne({ where: { email } })
    if (!user) {
      try {
        await Model.create({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          status: 1,
          role: USER_ROLE_USER,
        })
      } catch (error) {                               // If user's email already exists (because the account was deleted), then restore the user account and update infos
        await Model.restore({ where: { email } })
        user = await Model.findOne({ where: { email } })

        user.update({ first_name: firstName, last_name: lastName, phone_number: phoneNumber, password: password })
      }
    } else {
      throw EMAIL_ALREADY_EXISTS
    }
  }

  Model.deleteAccount = async ({ email, password }) => {
    const user = await Model.findOne({ where: { email } })
    if (user && crypt.compartPassword(password, user.dataValues.password)) {
      await user.destroy({ force: config.forceDestroy })
    } else {
      throw WRONG_PASSWORD
    }
  }

  Model.deleteAccountByAdmin = async ( id ) => {
    const user = await Model.findOne({ where: { id } })

    if (user) {
      await user.destroy({ force: config.forceDestroy })
    } else {
      throw ACCOUNT_DOES_NOT_EXIST
    }
  }

  Model.getAll = async () => {
    const list = await Model.findAll({
      attributes: ['role', 'id', ['first_name', 'firstName'], ['last_name', 'lastName'],'email', ['phone_number', 'phoneNumber'], 'created_at' ],
      raw: true,
    })

    for(let i = 0; i < list.length; i++) {
      list[i].roleName = roleToString(list[i].role)
      const date = new Date(list[i].created_at)
      list[i].created_at = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      delete list[i].role
    }
    return list
  }

  Model.getUserById = async ( id ) => {
    const user = await Model.findOne({ where: { id } })

    if (!user)
      throw USER_DOES_NOT_EXIST
    return user
  }

  Model.searchUser = async ({ email }) => {
    const user = await Model.findOne({ where: { email } })

    if (!user)
      throw EMAIL_DOES_NOT_CORRESPOND_TO_ANY_ACCOUNT
    return user
  }

  Model.searchPasswordToken = async ({ new_password_token }) => {
    const token = await Model.findOne({ where: { new_password_token } })

    if (token)
      return true
    else 
      return false
  }

  Model.addPasswordToken = async ({ id, new_password_token }) => {
    const user = await Model.findOne({ where : { id } })

    if (user) {
      await user.update( { new_password_token: new_password_token })
    }
    else
      throw USER_NOT_FOUND
  }

  Model.resetPassword = async ({ new_password_token, email, password }) => {
    const user = await Model.findOne({ where: { new_password_token, email } })

    if (user) {
      await user.update({ new_password_token: null, password: password })
    }
    else
      throw USER_NOT_FOUND
  }

  Model.updateInfos = async ({ id, email, firstName, lastName, phoneNumber, image, password }) => {
    // get the user
    const user = await Model.findOne({ where: { id } })
    // find the user's old image url
    let url = user.dataValues.image

    // upload the new image if new image inserted
    // change the url image
    if(image) {
      const keyName = slugify(crypt.encryptPassword(`${image.name}-${Date.now()}`))
      url = await awsS3.putImage(keyName, image)
    }
  
    if (user)
      await user.update({ email: email, first_name: firstName, last_name: lastName, phone_number: phoneNumber, image: url, password  })
    else
      throw USER_DOES_NOT_EXIST
  }

  Model.updateUserByAdmin = async ({ id, email, firstName, lastName, phoneNumber, roleName, password }) => {

    const user = await Model.findOne({ where: { id } })
    const role = roleToId(roleName)
    if (user) {
      try {
        await user.update({ email: email, first_name: firstName, last_name: lastName, phone_number: phoneNumber , role: role, password })
      } catch (error) {
        throw new Error(error)
      }
    } else
      throw USER_DOES_NOT_EXIST
  }

  Model.createAccountByAdmin = async ({ email, firstName, lastName, phoneNumber, roleName }, new_password_token) => {

    const user = await Model.findOne({ where: { email } })
    const role = roleToId(roleName)
    let response = null

    if (!user) {
      await Model.create({
        email,
        password: new_password_token,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        status: 1,
        role: role,
      })
        .then((result) => {
          response = result.dataValues
          response.roleName = roleToString(response.role)

          const date = new Date(response.created_at)
          response.created_at = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
          response.firstName = response.first_name
          response.lastName = response.last_name
        })
    } else {
      throw EMAIL_ALREADY_EXISTS
    }
    return(response)
  }

  Model.getStripeCustomerId = async (userId) => {
    const user = await Model.findOne({
      where: {
        id: userId,
      },
    })
    if (user) {
      let stripeCustomerId
      if (!user.dataValues.stripe_customer_id) {
        const customer = await stripe.customers.create()
        stripeCustomerId = customer.id
        await user.update({
          stripe_customer_id: stripeCustomerId,
        })
      } else {
        stripeCustomerId = user.dataValues.stripe_customer_id
      }
      await stripe.customers.update(stripeCustomerId, {
        email: user.dataValues.email,
        name: user.dataValues.username,
      })
      return stripeCustomerId
    }
    return null
  }
  return Model
}
