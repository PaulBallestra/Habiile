import axios from 'axios'
import config from 'config'
import { assert } from 'chai'
import { before } from 'mocha'

module.exports = function () {

  describe('Allowed call for users', () => {
    let userToken = null
    let tmp_user_id = null
    let tmp_user_email = 'user@test.com'
    let tmp_user_firstName = 'usertest_firstname'
    let tmp_user_lastName = 'usertest_lastname'
    let tmp_user_password = '123456'
    let tmp_user_phonenumber = '0654847428'

    let tmp_user_resetPassword = '123456789'

    let tmp_user_changedEmail = 'test@user.com'
    let tmp_user_changedFirstName = 'changed_firstname'
    let tmp_user_changedLastName = 'changed_lastname'
    let tmp_user_changedPassword = '147258369'
    let tmp_user_changedPhoneNumber = '0000000000'
    let tmp_password_token = null


    before(async () => {
      await axios.post(`${config.serverUrl}/users/create-account`, {
        email: tmp_user_email,
        firstName: tmp_user_firstName,
        lastName: tmp_user_lastName,
        phoneNumber: tmp_user_phonenumber,
        password: tmp_user_password,
      })

      await axios.post(`${config.serverUrl}/auths/login`, {
        email: tmp_user_email,
        password: tmp_user_password,
      }).then(res => userToken = res.data.token)
    })

    after(async () => {
      await axios.put(`${config.serverUrl}/users/delete-account`, {
        email: tmp_user_changedEmail,
        password: tmp_user_changedPassword,
      })

      ////// DELETE MESSAE FROM DB AFTER TESTS  (need to be admin)
      
    })

    it('should return user infos (email, firstname, lastname, phoneNuber, id and images)', async () => {
      let response = null

      await axios.get(`${config.serverUrl}/users/me`, {
        headers: {
          'Authorization': userToken,
        },
      }).then(res => response = res)
      tmp_user_id = response.data.data.id
      assert.deepEqual(response.data.data, {
        email: tmp_user_email,
        firstName: tmp_user_firstName,
        lastName: tmp_user_lastName,
        phoneNumber: tmp_user_phonenumber,
        id: response.data.data.id,
        image: '',
      })
    })

    it('lost password request should return 200 with a token', async () => {
      await axios.get(`${config.serverUrl}/auths/logout`, {
        email: tmp_user_email,
        password: tmp_user_password,
      })

      let response = null

      await axios.get(`${config.serverUrl}/users/lost-password/${tmp_user_email}`)
        .then(res => response = res )
      tmp_password_token = response.data.data.new_password_token
      assert.equal(response.status, 200)
    })
    

    it('reset password request should return 200', async () => {
      let response = null

      await axios.put(`${config.serverUrl}/users/reset-password`, {
        new_password_token: tmp_password_token,
        email: tmp_user_email,
        password: tmp_user_resetPassword ,
      })
        .then(res => response = res )
      assert.equal(response.status, 200)

      await axios.post(`${config.serverUrl}/auths/login`, {
        email: tmp_user_email,
        password: tmp_user_resetPassword ,
      }).then(res => userToken = res.data.token )
    })

    it('update user infos request should return 200', async () => {
      let response = null

      await axios.put(`${config.serverUrl}/users/update-infos/` + tmp_user_id, {
        email: tmp_user_changedEmail,
        firstName: tmp_user_changedFirstName,
        lastName: tmp_user_changedLastName,
        phoneNumber: tmp_user_changedPhoneNumber,
      }, {
        headers: {
          'Authorization': userToken,
        },
      })
        .then(res => response = res )
      assert.equal(response.status, 200)
    })

    it('change password request should return 200', async () => {
      let response = null

      await axios.put(`${config.serverUrl}/users/change-password/` + tmp_user_id, {
        newPassword: tmp_user_changedPassword,
      }, {
        headers: {
          'Authorization': userToken,
        },
      })
        .then(res => response = res )
      assert.equal(response.status, 200)
    })

    it('send message request should return 200', async () => {
      let response = null

      await axios.post(`${config.serverUrl}/messages/create-message/`, {
        firstName: tmp_user_firstName,
        lastName: tmp_user_lastName,
        email: tmp_user_email,
        phoneNumber: tmp_user_phonenumber,
        message: 'this is a test. Should return 200',
      })
        .then(res => response = res )
      assert.equal(response.status, 200)
    })


    it('send another message from the same user request should return error 401', async () => {
      let response = null

      await axios.post(`${config.serverUrl}/messages/create-message/`, {
        firstName: tmp_user_firstName,
        lastName: tmp_user_lastName,
        email: tmp_user_email,
        phoneNumber: tmp_user_phonenumber,
        message: 'this test should fail',
      })
        .catch (res => response = res )
      assert.equal(response.response.status, 403)
    })

    /*it('create item request should return 200', async () => {
      let response = null

      await axios.post(`${config.serverUrl}//items/create-item`, {
        firstName: tmp_user_firstName,
        lastName: tmp_user_lastName,
        email: tmp_user_email,
        phoneNumber: tmp_user_phonenumber,
        message: 'this is a test. A short test',
      })
        .then(res => response = res )
      assert.equal(response.status, 200)
      ////// DELETE MESSAE FROM DB AFTER TESTS !
    })*/

  })
}