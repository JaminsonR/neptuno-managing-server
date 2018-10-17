import util from './index'
import decode from 'jwt-decode'
import test from 'ava'

test('generar token', t => {
  let data = { names: 'joel' }
  let token = util.tokenGenerate(data)
  let decoded = decode(token)
  t.is(decoded.names, data.names)
})

test('verificar token', t => {
  let data = { names: 'joel' }
  let token = util.tokenGenerate(data)
  let esValido = util.tokenVerify(token)
  t.not(esValido, null)
})

test('token error', t => {
  let data = { names: 'joel' }
  let token = util.tokenGenerate(data)
  token = `${token}a`
  let esValido = util.tokenVerify(token)
  t.is(esValido, null)
})
