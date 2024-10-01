import Route, { Access } from './Route'
import { Types } from '../utils/types'
//import Ffmpeg from 'fluent-ffmpeg'

export default class RouteItems extends Route {
  constructor (params) {
    super({ ...params, model: 'items' })
  }

  @Route.Post({
    bodyType: Types.object().keys({
      title: Types.string().required(),
      description: Types.string().required(),
      price: Types.string(),
      image_path: Types.string(), //.required(),
    }),
    accesses: [Access.isLogin],
  })
  async createItem (ctx) {
    const { title, description, price } = this.body(ctx)

    const item = await this.model.createItem({
      title,
      description,
      price,
      image_path: ctx.request.files.image_path || null,
      userId: ctx.state.user.id,
    })
    this.sendOk(ctx, item || null)
  }

  @Route.Get({
    path: 'unique/:id',
    accesses: [Access.isLogin],
  })
  async unique (ctx) {
    const { id } = ctx.params
    const item = await this.model.getItem(id)
    this.sendOk(ctx, item)
  }

  @Route.Get({
    accesses: [Access.isLogin],
  })
  async getAllItems (ctx) {
    const response = await this.model.getAllItems()
    this.sendOk(ctx, response)
  }

  @Route.Put({
    bodyType: Types.object().keys({
      status: Types.string().required(),
      title: Types.string().required(),
      description: Types.string().required(),
      price: Types.string().required(),
      image_path: Types.string().required(),
    }),
    path: 'update-item/:id',
    accesses: [Access.isAdmin],
  })
  async updateItem (ctx) {
    const { id } = ctx.params
    const { status, title, description, price, image_path } = this.body(ctx)
    await this.model.updateItem({ id, status, title, description, price, image_path })
    this.sendOk(ctx, 'OK')
  }

  @Route.Put({
    path: 'delete-item/:id',
    accesses: [Access.isAdmin],
  })
  async deleteItem (ctx) {
    const { id } = ctx.params
    await this.model.deleteItem({ id })
    this.sendOk(ctx, 'OK')
  }
}
