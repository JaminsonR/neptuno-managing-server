const jwt = require('jsonwebtoken')
const { SECRET, EXPIRE } = require('../config')
module.exports = {
  /*
  // Verify Token
  */
  tokenVerify (token) {
    try {
      let decoded = jwt.verify(token, SECRET)
      return decoded
    } catch (err) {
      return null
    }
  },
  /*
  * generate token
  * @param {string} dataInsideToken - Data send to token.
  * @returns {string} token.
  */
  tokenGenerate (dataInsideToken) {
    let token = jwt.sign({ ...dataInsideToken }, SECRET, { expiresIn: EXPIRE })
    return token
  }
}
