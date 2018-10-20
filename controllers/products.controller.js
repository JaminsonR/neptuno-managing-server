const ProductModel = require('../models/product.model')
var responses = require('../utils/responses')

module.exports = {
  async getAll () {
    try {
      const products = await ProductModel.getAll()
      return responses.OK(products)
    } catch (error) {
      console.log(error)
      return responses.SERVER_ERROR
    }
  },
  async create ({ id, name, taxable, price, stock, isPrime }) {
    let product = arguments[0]
    let productObj = new ProductModel(product)
    let created = await productObj.create()
    return responses.OK(created)
  }
}
