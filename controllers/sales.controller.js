const SalesModel = require('../models/sale.model')
const ProductModel = require('../models/product.model')
const responses = require('../utils/responses')

function formatSales (sales) {
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
  return (formatSales)
}

module.exports = {
  async getAll () {
    try {
      const sales = await SalesModel.getAll()
      let formatS = formatSales(sales)
      return responses.OK(formatS)
    } catch (error) {
      console.log(error)
      return responses.SERVER_ERROR
    }
  },
  async create ({ client_id, date, client_name, client_phone, client_address, items, subtotal, tax, total, status, due_date }) {
    try {
      let sale = arguments[0]
      let items = sale.items
      let idsItems = items.reduce((result, item) => {
        result.push(item['product_id'])
        return result
      }, [])
      let products = await ProductModel.getAllById(idsItems)

      let itemsById = items.reduce((result, item) => {
        let id = item['product_id']
        result[id] = item
        return result
      }, {})

      let productsById = products.reduce((result, item) => {
        let id = item['id']
        result[id] = item
        return result
      }, {})

      let productsNotAvailable = []
      let productsUpdate = []
      for (let product in productsById) {
        let stockProduct = productsById[product]['stock']
        let stockItem = itemsById[product]['quantity']
        let areProductsForSale = stockProduct >= stockItem
        if (!areProductsForSale) {
          productsNotAvailable.push(itemsById[product])
        } else {
          let productUpdate = productsById[product]
          productUpdate.stock = stockProduct - stockItem
          productsUpdate.push(productUpdate)
        }
      }

      let areProductsNotAvailable = productsNotAvailable.length !== 0
      if (areProductsNotAvailable) {
        return responses.NOT_OK(productsNotAvailable)
      }

      await ProductModel.updateBulk(productsUpdate)
      let saleObj = new SalesModel(sale)
      await SalesModel.init()
      let created = await saleObj.create()
      return responses.OK(created)
    } catch (error) {
      if (error.type) {
        return responses.CUSTOM_ERROR(error)
      }
      return responses.SERVER_ERROR
    }
  },
  // Gets the sum of sales per month
  async getPerMonth () {
    try {
      const sales = await SalesModel.getPerMonth()
      let formatSales = []
      for (let sale of sales) {
        let formatSale = {
          date: sale.date,
          total: ''
        }
        formatSale.total = Number(sale.total)
        formatSales.push(formatSale)
      }
      return responses.OK(formatSales)
    } catch (error) {
      if (error.type) {
        return responses.CUSTOM_ERROR(error)
      }
      return responses.SERVER_ERROR
    }
  },
  // Gets all the sales from one month + year
  async getFromMonth ({ month, year }) {
    try {
      const sales = await SalesModel.getFromMonth({ month, year })
      let formatS = formatSales(sales)
      return responses.OK(formatS)
    } catch (error) {
      if (error.type) {
        return responses.CUSTOM_ERROR(error)
      }
      return responses.SERVER_ERROR
    }
  }
}
