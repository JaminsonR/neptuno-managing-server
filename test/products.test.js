import app from '../app'
import test from 'ava'
import request from 'supertest'
import db from '../config/db'
import { URL_DB } from '../config'
import { testProperty } from '../utils'
import products from './mocks/products'
import ProductModel from '../models/product.model'

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
  let [product] = products
  let productObj = new ProductModel(product)
  await productObj.create()
  let res = await request(app).get(`/api/products`)
  t.is(res.body.state, true)
  t.is(res.body.stateCode, 200)
  t.is(res.body.data.length, 1)
})

test.serial('create', async t => {
  let [product] = products
  let res = await request(app).post(`/api/products`).send(product)
  t.is(res.body.state, true)
  t.is(res.body.stateCode, 200)
  t.is(typeof res.body.data, 'object')
  let id = res.body.data.id
  let created = await ProductModel.get(id)
  testProperty(product, created, t)
})
