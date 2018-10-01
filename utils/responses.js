
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

module.exports = {
    serverError,
    ok
  }
