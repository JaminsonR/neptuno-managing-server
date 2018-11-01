const UserModel = require('../models/user.model')
var responses = require('../utils/responses')

module.exports = {
  async getAll () {
    try {
      const users = await UserModel.getAll()
      return responses.OK(users)
    } catch (error) {
      console.log(error)
      return responses.SERVER_ERROR
    }
  },
  async create ({ id, password, first_name, middle_name, family_name, last_name }) {
    try {
      let user = arguments[0]
      let userObj = new UserModel(user)
      await UserModel.init()
      let created = await userObj.create()
      return responses.OK(created)
    } catch (error) {
      if (error.type) {
        return responses.CUSTOM_ERROR(error)
      }
      return responses.SERVER_ERROR
    }
  }
}
