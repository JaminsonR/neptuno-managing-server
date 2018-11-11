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
    try {
      let product = arguments[0]
      let productObj = new ProductModel(product)
      await ProductModel.init()
      let created = await productObj.create()
      return responses.OK(created)
    } catch (error) {
      if (error.type) {
        return responses.CUSTOM_ERROR(error)
      }
      return responses.SERVER_ERROR
    }
  },
  // amount is positive or negative
  async modifyStock ({ id, amount }) {
    try {
      const wasUpdated = await ProductModel.modifyExistence({ id, amount })
      if (!wasUpdated) {
        return responses.NOT_OK('Error al actualizar')
      }
      return responses.OK('Actualizado correctamente')
    } catch (error) {
      return responses.SERVER_ERROR
    }
  }
}
