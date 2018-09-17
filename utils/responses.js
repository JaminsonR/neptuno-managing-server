
function serverError (res) {
  return res.status(500).json({
    estado: false,
    errorCodigo: 500,
    errorMensaje: "Servidor error"
  })
}

function ok (res, datos) {
  return res.status(200).json({estado: true, datos: datos});
}

module.exports = {
    serverError,
    ok
  }
