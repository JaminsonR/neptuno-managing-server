function serverError (res) {
  return res.status(500).json({
    status: false,
    errorCodigo: 500,
    errorMensaje: 'Servidor error'
  })
}

function ok (res, data) {
  return res.status(200).json({ status: true, data: data })
}

const SERVER_ERROR = { data: 'Server Error', stateCode: 500, state: false }

const UNAUTHORIZED = { data: 'Unauthorized', stateCode: 401, state: false }

const NOT_JWT = { data: 'Did not send jwt in the Bearer', stateCode: 401, state: false }

const NOT_AUTH = { data: 'Did not send authorization', stateCode: 401, state: false }

const NOT_BEARER = { data: 'Did not send Bearer keyword', stateCode: 401, state: false }

const OK = (data) => {
  const resp = { state: true, data, stateCode: 200 }
  return resp
}

const CREATED = (data) => {
  const resp = { state: true, data, stateCode: 201 }
  return resp
}

const NOT_OK = (data) => {
  return {
    state: false,
    data,
    stateCode: 200
  }
}

const NOT_FOUND = (data) => {
  return {
    state: false,
    data,
    stateCode: 404
  }
}

module.exports = {
  serverError,
  ok,
  SERVER_ERROR,
  UNAUTHORIZED,
  OK,
  NOT_OK,
  CREATED,
  NOT_JWT,
  NOT_FOUND,
  NOT_AUTH,
  NOT_BEARER
}
