const SalesModel = require('../models/sale.model')
const response = require('../utils/responses')

const storeSale = (req, res) => {
  let sale = new SalesModel({
    client_id: req.body.client_id,
    date: req.body.date,
    client_name: req.body.client_name,
    client_phone: req.body.client_phone,
    client_address: req.body.client_address,
    items: req.body.items,
    subtotal: req.body.subtotal,
    tax: req.body.tax,
    total: req.body.total,
    status: req.body.status,
    due_date: req.body.due_date
  })
  sale.storeSale((err) => {
    if (err) {
      console.log(err)
      return response.serverError(res)
    }
    return response.ok(res, sale)
  })
}
const getSalesPerMonth = (req, res) => {
  SalesModel.getSalesPerMonth((err, sales) => {
    if (err) {
      console.log(err)
      return response.serverError(res)
    }

    let formatSales = []

    for (let sale of sales) {
      let formatSale = {
        date: sale.date,
        total: ''
      }
      formatSale.total = Number(sale.total)
      formatSales.push(formatSale)
    }
    console.log(formatSales)
    return response.ok(res, formatSales)
  })
}
const getSales = (req, res) => {
  SalesModel.getSales((err, sales) => {
    if (err) {
      console.log(err)
      return response.serverError(res)
    }
    let formatSales = []

    for (let sale of sales) {
      let formatSale = {
        id: sale._id,
        client_id: sale.client_id,
        date: sale.date,
        client_name: sale.client_name,
        client_phone: sale.client_phone,
        client_address: sale.client_address,
        status: sale.status,
        due_date: sale.due_date,
        items: [],
        subtotal: '',
        tax: '',
        total: ''
      }
      formatSale.tax = Number(sale.tax)
      formatSale.subtotal = Number(sale.subtotal)
      formatSale.total = Number(sale.total)
      for (let item of sale.items) {
        let formatItem = {}
        formatItem.price = Number(item.price)
        formatItem.amount = Number(item.amount)
        formatItem.quantity = Number(item.quantity)
        formatItem.product_id = item.product_id
        formatItem.product_name = item.product_name
        formatSale.items.push(formatItem)
      }
      formatSales.push(formatSale)
    }
    return response.ok(res, formatSales)
  })
}

module.exports = {
  storeSale,
  getSales,
  getSalesPerMonth
}
