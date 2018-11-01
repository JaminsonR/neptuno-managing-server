import app from '../app'
import test from 'ava'
import request from 'supertest'
import db from '../config/db'
import { URL_DB } from '../config'
import { testProperty } from '../utils'
import sales from './mocks/sales'
import SalesModel from '../models/sale.model'

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

test.serial('create', async t => {
  let [sale] = sales
  let res = await request(app).post(`/api/sales`).send(sale)
  t.is(res.body.state, true)
  t.is(res.body.stateCode, 200)
  t.is(typeof res.body.data, 'object')
  let id = res.body.data.id
  let created = await SalesModel.get(id)
  testProperty(sale, created, t, ['date'])
})

test.serial('get all', async t => {
  let [sale] = sales
  let saleObj = new SalesModel(sale)
  await saleObj.create()
  let res = await request(app).get(`/api/sales`)
  t.is(res.body.state, true)
  t.is(res.body.stateCode, 200)
  t.is(res.body.data.length, 1)
})

test.serial('month statistics', async t => {
  let [sale] = sales
  let saleObj = new SalesModel(sale)
  await saleObj.create()
  let res = await request(app).get(`/api/sales/months`)
  t.is(res.body.state, true)
  t.is(res.body.stateCode, 200)
  t.is(res.body.data.length, 1)
  let [resp] = res.body.data
  t.is(resp.date, 11)
  t.is(resp.total, 16.6)
})
