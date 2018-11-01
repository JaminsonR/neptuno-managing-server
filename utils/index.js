const jwt = require('jsonwebtoken')
const { SECRET, EXPIRE } = require('../config')
module.exports = {
  tokenVerify (token) {
    try {
      let decoded = jwt.verify(token, SECRET)
      return decoded
    } catch (err) {
      return null
    }
  },
  /**
   * Generate token
   *
   * @param {object} dataInsideToken Jwt data
   * @returns {string} jwt token
   */
  tokenGenerate (dataInsideToken) {
    let token = jwt.sign({ ...dataInsideToken }, SECRET, { expiresIn: EXPIRE })
    return token
  },

  /**
   * Compare object easy
   *
   * @param {object} baseObject Object base mocking
   * @param {object} objectResponse Compare object from db
   * @param {object} t Test object from ava test runner
   * @param {Array} ignoreProperty Properties that have been ignored
   */
  testProperty (baseObject, objectResponse, t, ignoreProperty) {
    for (let property in baseObject) {
      if (ignoreProperty && ignoreProperty.includes('date')) {
        continue
      }
      t.is(baseObject[property], objectResponse[property], `Object property error: ${property}`)
    }
  }
}
