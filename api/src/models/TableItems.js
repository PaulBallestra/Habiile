import awsS3 from '../utils/AwsS3'
import { crypt } from '../utils'
import slugify from 'slugify'
import { ItemStatusToString, ItemStatusToId  } from '../constants/itemStatus'

export default (sequelizeInstance, Model) => {
  
  Model.createItem = async ({ title, description, price, image, userId, status }) => {
    let response = null
    // upload image
    /*const keyName = slugify(crypt.encryptPassword(`${image.name}-${Date.now()}`))
    var url = await awsS3.putimage(keyName, image)

    if (!url) {
      return null
    }*/

    const item = await Model.create({
      title,
      description,
      price,
      owner_id: userId,
      image_path: '',//url.url,
      status: status,
    })

    if (!item) {
      return null
    }

    // return item
    await Model.getItem(item.dataValues.id)
      .then((result) => {
        response = result
        const date = new Date(result.created_at)
        response.created_at = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      })
    return response
  }

  Model.getItem = async (itemId) => {
    const item = await Model.findOne({
      attributes: ['id', 'title', 'description', 'price', 'image_path', 'created_at', 'status'],
      where: { id: itemId },
      raw: true,
    })

    if (item) {
      return item
    }

    return null
  }

  // get all items
  Model.getAllItems = async () => {
    const items = await Model.findAll({
      attributes: ['id', 'title', 'description', 'price' , 'image_path', 'owner_id', 'created_at', 'status'],
      raw: true,
    })

    for(let i = 0; i < items.length; i++) {
      items[i].status = ItemStatusToString(items[i].status)
      const date = new Date(items[i].created_at)
      items[i].created_at = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    }

    return items
  }

  Model.deleteItem = async ({ id }) => {
    const item = await Model.findOne({ where: { id } })
    if (item)
      await item.destroy()
    else
      throw 'Item introuvable'
  }

  Model.updateItem = async ({ id, status, title, description, price, image_path }) => {
    const item = await Model.findOne({ where: { id } })
    status = ItemStatusToId(status)

    if (item) {
      await item.update({ status, title, description, price, image_path }) 
    }
    else
      throw 'Item introuvable'
  }

  return Model
}
