const ProductModel = require('../models/product.model')
var response = require('../utils/responses')

const storeProduct = (req, res) => {
  // let Product = new ProductModel({
  //   id      : req.body.id,
  //   name    : req.body.name,
  //   price   : req.body.price,
  //   taxable : req.body.taxable
  // });
  // sale.storeProduct((err) => {
  //   if (err){
  //     console.log(err)
  //     return response.serverError(res);
  //   }
  //   return response.ok(res, sale);
  // });
}

const getProducts = (req, res) => {
  ProductModel.getProducts((err, Products) => {
    if (err) return response.serverError(res)
    let formatProducts = []
    for (let product of Products) {
      let productTmp = {}
      productTmp._id = product._id
      productTmp.name = product.name
      productTmp.price = Number(product.price)
      productTmp.id = product.id
      productTmp.taxable = product.taxable
      formatProducts.push(productTmp)
    }
    return response.ok(res, formatProducts)
  })
}

module.exports = {
  storeProduct,
  getProducts
}
