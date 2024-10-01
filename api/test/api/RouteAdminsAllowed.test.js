import axios from 'axios'
import config from 'config'
import { assert } from 'chai'
import { before } from 'mocha'

module.exports = function () {

  describe('Allowed calls for admin', () => {

    let createdUserId = -1
    let adminToken = null

    const tmp_userFirstrName = 'user'
    const tmp_userLastName = 'user'
    const tmp_userEmail = 'tmpuser@test.com'
    const tmp_userRoleName = 'Client'

    before(async () => {
      await axios.post(`${config.serverUrl}/auths/login`, {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      }).then(res => adminToken = res.data.token)

      await axios.post(`${config.serverUrl}/users/create-account-by-admin`, {
        email: tmp_userEmail,
        roleName: tmp_userRoleName,
        firstName: tmp_userFirstrName,
        lastName: tmp_userLastName,
      }, {
        headers: {
          'Authorization': adminToken,
        },
      }
      ).then((response) => createdUserId = response.data.data.id)
    })

    after(async () => {
      await axios.put(`${config.serverUrl}/users/delete-account-by-admin/` + createdUserId, {
        email: tmp_userEmail,
        firstName: tmp_userFirstrName,
        lastName: tmp_userLastName,
      } ,{
        headers: {
          'Authorization': adminToken,
        },
      })
    })

    it('Logged in to get all clients ', async () => {
      let response = null
      try {
        response = await axios.get(`${config.serverUrl}/users/get-all`, {
          headers: {
            'Authorization': adminToken,
          },
        })
      } catch (error) {
        response = error
      }
      assert.equal(response.status, 200)
    })

    it('Logged in to get clients messages ', async () => {
      let response = null
      try {
        response = await axios.get(`${config.serverUrl}/messages/get-all-messages`, {
          headers: {
            'Authorization': adminToken,
          },
        })
      } catch (error) {
        response = error
      }
      assert.equal(response.status, 200)
    })
  })

}
