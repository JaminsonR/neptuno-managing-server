import util from './index'
import decode from 'jwt-decode'
import test from 'ava'

test('generar token', t => {
  let datos = { nombres: 'joel' }
  let token = util.generarToken(datos)
  let decoded = decode(token)
  t.is(decoded.nombres, datos.nombres)
})

test('verificar token', t => {
  let datos = { nombres: 'joel' }
  let token = util.generarToken(datos)
  let esValido = util.verificarToken(token)
  t.not(esValido, null)
})

test('token error', t => {
  let datos = { nombres: 'joel' }
  let token = util.generarToken(datos)
  token = `${token}a`
  let esValido = util.verificarToken(token)
  t.is(esValido, null)
})