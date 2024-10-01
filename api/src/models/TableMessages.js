import { MessageStatusToString, MessageStatusToId  } from '../constants/messageStatus'

export default (sequelizeInstance, Model) => {

  Model.getAllMessages = async () => {
    const list = await Model.findAll({
      attributes: ['id', 'status' ,'email', ['first_name', 'firstName'], ['last_name', 'lastName'], ['phone_number', 'phoneNumber'], 'message', 'created_at' ],
      raw: true,
    })

    for(let i = 0; i < list.length; i++) {
      list[i].status = MessageStatusToString(list[i].status)
      const date = new Date(list[i].created_at)
      list[i].created_at = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }
    return list
  }

  Model.createMessage = async ({ email, firstName, lastName, phoneNumber, message }) => {
    const msg = await Model.findOne({ where: { email, first_name: firstName, last_name: lastName } })
    if (!msg) {
      await Model.create({
        status: 1,
        first_name: firstName,
        last_name: lastName, 
        email,
        phone_number: phoneNumber,
        message,
      })
    } else {
      throw 'Un message de votre part est déjà en cours de traitement'
    }
  }

  Model.deleteMessage = async ({ id }) => {
    const msg = await Model.findOne({ where: { id } })
    if (msg)
      await msg.destroy()
    else
      throw 'Message introuvable'
  }

  Model.updateMessage = async ({ id, status, email, firstName, lastName, phoneNumber, message }) => {
    const msg = await Model.findOne({ where: { id } })
    status = MessageStatusToId(status)

    if (msg) {
      await msg.update({ status, email, first_name: firstName, last_name: lastName, phone_number: phoneNumber, message }) 
    }
    else
      throw 'Message introuvable'
  }

  return Model
}