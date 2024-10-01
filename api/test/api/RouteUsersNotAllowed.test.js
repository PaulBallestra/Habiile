import axios from 'axios'
import config from 'config'
import { assert } from 'chai'

module.exports = function () {

  describe('Call forbidden', () => {

    it('Not allowed to get clients messages ', async () => {
      let response = null

      try {
        response = await axios.get(`${config.serverUrl}/messages/get-all-messages`)
      } catch (error) {
        response = error
        console.log('')
      }
      assert.equal(response.response.status, 403)
    })

    it('Not allowed to get all users', async () => {
      let response = null

      try {
        response = await axios.get(`${config.serverUrl}/users/get-all`)
      } catch (error) {
        response = error
      }
      assert.equal(response.response.status, 403)
    })

    it('Not allowed to create account by admin ', async () => {
      let response = null

      try {
        response = await axios.post(`${config.serverUrl}/users/create-account-by-admin`)
      } catch (error) {
        response = error
      }
      assert.equal(response.response.status, 403)
    })

    it('Not allowed to delete account ', async () => {
      let response = null

      try {
        response = await axios.post(`${config.serverUrl}/users/delete-account`)
      } catch (error) {
        response = error
      }
      assert.equal(response.response.status, 404)
    })

    it('Not allowed to update infos ', async () => {
      let response = null

      try {
        response = await axios.put(`${config.serverUrl}/users/update-infos/1`)
      } catch (error) {
        response = error
      }
      assert.equal(response.response.status, 403)
    })

    it('Not allowed to change password ', async () => {
      let response = null

      try {
        response = await axios.put(`${config.serverUrl}/users/change-password/1`)
      } catch (error) {
        response = error
      }
      assert.equal(response.response.status, 403)
    })

    it('Not allowed to delete account by admin ', async () => {
      let response = null

      try {
        response = await axios.put(`${config.serverUrl}/users/delete-account-by-admin/1`)
      } catch (error) {
        response = error
      }
      assert.equal(response.response.status, 403)
    })

    it('Not allowed to update account by admin ', async () => {
      let response = null

      try {
        response = await axios.put(`${config.serverUrl}/users/update-account-by-admin/1`)
      } catch (error) {
        response = error
      }
      assert.equal(response.response.status, 403)
    })
  })

}
