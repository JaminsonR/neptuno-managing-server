const UserModel = require('../models/user')
const responses = require('../utils/responses')
const { generarToken } = require('../utils')
module.exports = {
  async login (id, password) {
    try {
      let usuario = await UserModel.login(id, password)
      if (!usuario) {
        return responses.NO_OK('El usuario no existe') 
      } else {
        let token = generarToken(usuario)
        return responses.OK(token)
      }
    } catch (err) {
      console.error(err)
      return responses.NO_OK('Login error') 
    }
  }
}