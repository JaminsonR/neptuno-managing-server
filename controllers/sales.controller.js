const SalesModel = require('../models/sale.model');
var response = require('../utils/responses');

const storeSale = (req, res) => {
  console.log("si lleeo el req de sales")
  let sale = new SalesModel({
    client_id      : req.body.client_id,
    date           : req.body.date,
    client_name    : req.body.client_name,
    client_phone   : req.body.client_phone,
    client_address : req.body.client_address,
    items          : req.body.items,
    subtotal       : req.body.subtotal,
    tax            : req.body.tax,
    total          : req.body.total,
  });
  sale.storeSale((err) => {
    if (err){
      console.log(err)
      return response.serverError(res);
    } 
    return response.ok(res, sale);
  });
}



const getSales = (req, res) => {
  console.log("si lleeo el get de sales")
  SalesModel.getSales((err, sales) => {
    if (err) return response.serverError(res);
    return response.ok(res, sales);
  })
}


module.exports = {
  storeSale,
  getSales
}

