import app from '../app'
import test from 'ava'
import request from 'supertest'
import db from '../config/db'
import { URL_DB } from '../config'
import users from './mocks/users'
import UsersModel from '../models/user.model'

test.before(async t => {
  await db.connect(URL_DB())
})

test.beforeEach(async t => {
  await db.clean()
})

test.after('cleanup', async t => {
  await db.clean()
  db.disconnect()
})

test('login ok', async t => {
  let [user] = users
  let userObj = new UsersModel(user)
  await userObj.create()
  let res = await request(app).post(`/api/login/auth`).send({ id: user['id'], password: user['password'] })
  t.is(res.body.state, true)
  t.is(res.body.stateCode, 200)
  t.is(typeof res.body.data, 'string')
})

test('login fail', async t => {
  let [user] = users
  let userObj = new UsersModel(user)
  await userObj.create()
  let res = await request(app).post(`/api/login/auth`).send({ id: '023', password: '123' })
  t.is(res.body.state, false)
  t.is(res.body.stateCode, 200)
  t.is(res.body.data, 'El usuario no existe')
})
