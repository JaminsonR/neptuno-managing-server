const ProductModel = require('../models/product.model');
var response = require('../utils/responses');

const storeProduct = (req, res) => {
  let Product = new ProductModel({
    id      : req.body.id,
    name    : req.body.name,
    price   : req.body.price
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
    console.log(Products)
    return response.ok(res, Products);
  })
}


module.exports = {
  storeProduct,
  getProducts
}

