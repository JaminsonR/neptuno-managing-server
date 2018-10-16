const jwt = require('jsonwebtoken')
const { SECRET, EXPIRE } = require('../config')
module.exports = {
  verificarToken (token) {
    try {
      let decoded = jwt.verify(token, SECRET)
      return decoded
    } catch(err) {
      return null
    }
  },
  generarToken (datosEnToken) {
    let token = jwt.sign({ ...datosEnToken }, SECRET, { expiresIn: EXPIRE })
    return token
  }
}