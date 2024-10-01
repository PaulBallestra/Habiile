import Route from './Route'
import { Types } from '../utils/types'

export default class RouteLanguage extends Route {
  constructor (params) {
    super({ ...params })
  }

  @Route.Post({
    bodyType: Types.object().keys({
      lang: Types.string().required(),
    }),
  })
  async send (ctx) {
    const { lang } = this.body(ctx)
    // attach the language to the LANGUAGE global variable
    // (the global variable is setted on the App.js file)
    LANGUAGE = lang
  }
}