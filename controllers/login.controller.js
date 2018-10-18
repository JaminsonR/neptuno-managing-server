const UserModel = require('../models/user.model')
const responses = require('../utils/responses')

const { tokenGenerate } = require('../utils')

module.exports = {
  /**
   * Login process controller
   * @param {string} id
   * @param {string} password
   * @returns response object
   */
  async login (id, password) {
    try {
      let user = await UserModel.login(id, password)
      if (!user) {
        return responses.NOT_OK('El usuario no existe')
      } else {
        let token = tokenGenerate(user)
        return responses.OK(token)
      }
    } catch (err) {
      console.error(err)
      return responses.NOT_OK('Login error')
    }
  }
}
