import { default as server } from '../src/index'


import routeIndex from './api/Route.test.js'
import routeUsersNotAllowed from './api/RouteUsersNotAllowed.test.js'
import routeUsersAllowed from './api/RouteUsersAllowed.test.js'
import routeAdminsAllowed from './api/RouteAdminsAllowed.test.js'
import config from 'config'

describe('Test server is ready', () => {
  before((done) => {
    console.log('BEFORE WAITING SERVER')
    server.isReady = function () {
      console.log('config', config)
      done()
    }
  })

  console.log('SERVER_URL= ', config.serverUrl)
  routeIndex()
  routeUsersNotAllowed()
  routeAdminsAllowed()
  routeUsersAllowed()

  after(function () {
    server.done()
  })
})
