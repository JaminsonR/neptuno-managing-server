import app from '../app'
import test from 'ava'
import request from 'supertest'
import db from '../config/db'
import { URL_DB } from '../config'
import users from './mocks/users'
import UsersModel from '../models/user'

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

test('login', async t => {
  let [user] = users
  let userObj = new UsersModel(user)
  await userObj.create()
  let res = await request(app).post(`/api/login/auth`).send({ id: user['id'], password: user['password'] })
  t.is(true, true)
})
