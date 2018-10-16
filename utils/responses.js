function serverError (res) {
  return res.status(500).json({
    status: false,
    errorCodigo: 500,
    errorMensaje: "Servidor error"
  })
}

function ok (res, data) {
  return res.status(200).json({status: true, data: data});
}

const ERROR_SERVIDOR = { datos: { mensaje_error: 'Error en el servidor' }, codigoEstado: 500, estado: false }

const NO_AUTORIZADO = { datos: { mensaje_error: 'No autorizado' }, codigoEstado: 401, estado: false }

const NO_ENVIO_JWT = { datos: { mensaje_error: 'No envio el jwt en el Bearer' }, codigoEstado: 401, estado: false }

const OK = (datos) => {
  const resp = { estado: true, datos, codigoEstado: 200 }
  return resp
}

const CREADO = (datos) => {
  const resp = { estado: true, datos, codigoEstado: 201 }
  return resp
}

const NO_OK = (mensaje) => {
  return {
    estado: false,
    mensaje,
    codigoEstado: 200
  }
}

const REGISTRO_NO_ENCONTRADO = (mensaje) => {
  return {
    estado: false,
    mensaje,
    codigoEstado: 404
  }
}

module.exports = {
  serverError,
  ok,
  ERROR_SERVIDOR,
  NO_AUTORIZADO,
  OK,
  NO_OK,
  CREADO,
  NO_ENVIO_JWT,
  REGISTRO_NO_ENCONTRADO
}