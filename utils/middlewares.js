const responses = require('./responses')
const { tokenVerify } = require('./index')
module.exports = {
  jwt (req, res, next) {
    const token = req.headers['authorization'] || req.headers['Authorization']
    if (!token) {
      let resp = responses.NOT_JWT
      return res.status(resp.stateCode).send(resp)
    }
    const isValid = tokenVerify(token)
    if (!isValid) {
      let resp = responses.UNAUTHORIZED
      return res.status(resp.stateCode).send(resp)
    }
    next()
  }
}
