const ProductModel = require('../models/product.model');
var response = require('../utils/responses');

const storeProduct = (req, res) => {
  let Product = new ProductModel({
    id      : req.body.id,
    name    : req.body.name,
    price   : req.body.price,
    taxable : req.body.taxable
  });
  sale.storeProduct((err) => {
    if (err){
      console.log(err)
      return response.serverError(res);
    } 
    return response.ok(res, sale);
  });
}



const getProducts = (req, res) => {
  ProductModel.getProducts((err, Products) => {
    if (err) return response.serverError(res);
    format_products = []
    for (let product of Products){
      format_product = {}
      format_product._id = product._id
      format_product.name = product.name
      format_product.price = Number(product.price) 
      format_product.id = product.id
      format_product.taxable = product.taxable
      format_products.push(format_product)
    }
    
    return response.ok(res, format_products);
  })
}


module.exports = {
  storeProduct,
  getProducts
}

