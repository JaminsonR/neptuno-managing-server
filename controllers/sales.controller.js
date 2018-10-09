const SalesModel = require('../models/sale.model');
var response = require('../utils/responses');

const storeSale = (req, res) => {
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
    status         : req.body.status,
    due_date       : req.body.due_date
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
  SalesModel.getSales((err, sales) => {
    if (err){
      console.log(err)
      return response.serverError(res);
    } 
    let format_sales = []

    for (let sale of sales){
      let format_sale = {
        _id : sale._id,
        client_id : sale.client_id,
        date : sale.date,
        client_name : sale.client_name,
        client_phone : sale.client_phone,
        client_address : sale.client_address,
        status: sale.status
        due_date: sale.due_date
        items : [],
        subtotal : "",
        tax : "",
        total : ""
      }
      format_sale.tax = Number(sale.tax)
      format_sale.subtotal = Number(sale.subtotal)
      format_sale.total = Number(sale.total)
      for (let item of sale.items){
        format_item = {}
        format_item.price = Number(item.price)
        format_item.amount = Number(item.amount)
        format_item.quantity = Number(item.quantity)
        format_item.product_id = item.product_id
        format_item.product_name = item.product_name

        format_sale.items.push(format_item)
      }

      format_sales.push(format_sale)
    }


    return response.ok(res, format_sales);
  })
}


module.exports = {
  storeSale,
  getSales
}

