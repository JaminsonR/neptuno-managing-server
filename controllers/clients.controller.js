const ClientModel = require('../models/client.model');
var response = require('../utils/responses');

const storeClient = (req, res) => {
  let client = new ClientModel({
    client_id      : req.body.client_id,
    client_name    : req.body.client_name,
    client_phone   : req.body.client_phone,
    client_address : req.body.client_address,
  });
  sale.storeClient((err) => {
    if (err){
      console.log(err)
      return response.serverError(res);
    } 
    return response.ok(res, sale);
  });
}



const getClients = (req, res) => {
  SalesModel.getSales((err, sales) => {
    if (err) return response.serverError(res);
    return response.ok(res, sales);
  })
}


module.exports = {
  storeClient,
  getClient
}

