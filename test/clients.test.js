import app from '../app'
import test from 'ava'
import request from 'supertest'
import db from '../config/db'
import { URL_DB } from '../config'
import { testProperty } from '../utils'
import clients from './mocks/clients'
import ClientModel from '../models/client.model'

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

test.serial('get all', async t => {
  let [client] = clients
  let clientObj = new ClientModel(client)
  await clientObj.create()
  let res = await request(app).get(`/api/clients`)
  t.is(res.body.state, true)
  t.is(res.body.stateCode, 200)
  t.is(res.body.data.length, 1)
})

test.serial('create', async t => {
  let [client] = clients
  let res = await request(app).post(`/api/clients`).send(client)
  t.is(res.body.state, true)
  t.is(res.body.stateCode, 200)
  t.is(typeof res.body.data, 'object')
  let id = res.body.data.id
  let created = await ClientModel.get(id)
  testProperty(client, created, t)
})
