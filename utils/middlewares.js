const responses = require('./responses')
const { tokenVerify } = require('./index')

function splitAndTrim (word) {
  let [bearer, token] = word.split(' ')
  return [bearer.trim(), token.trim()]
}

module.exports = {
  jwt (req, res, next) {
    const authorization = req.headers['authorization'] || req.headers['Authorization']
    if (!authorization) {
      const resp = responses.NOT_AUTH
      return res.status(resp.stateCode).send(resp)
    }

    const sendBearerAndToken = authorization.split(' ').length === 2
    if (!sendBearerAndToken) {
      const resp = responses.NOT_AUTH
      return res.status(resp.stateCode).send(resp)
    }

    const [bearer, token] = splitAndTrim(authorization)
    const isBearerWord = bearer.toLowerCase() !== 'bearer'
    if (isBearerWord) {
      const resp = responses.NOT_BEARER
      return res.status(resp.stateCode).send(resp)
    }

    if (!token) {
      const resp = responses.NOT_JWT
      return res.status(resp.stateCode).send(resp)
    }

    const isValidToken = tokenVerify(token)
    if (!isValidToken) {
      const resp = responses.UNAUTHORIZED
      return res.status(resp.stateCode).send(resp)
    }
    next()
  },
  middlewareTesting (isTesting, middleware) {
    if (!isTesting) {
      return middleware
    } else {
      return (req, res, next) => { next() }
    }
  }
}
