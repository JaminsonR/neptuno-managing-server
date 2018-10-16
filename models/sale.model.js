const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
mongoose.Promise = global.Promise;

// create a schema
const SaleSchema = new Schema({
	client_id  :  { type: String, required: true },
    date  : { type: Date, required: true },
    client_name  :  { type: String, required: true },
    client_phone  :  { type: String, required: true },
    client_address  :  { type: String, required: true },
    items  : [],
    subtotal  : { type: mongoose.Schema.Types.Decimal128, required: true },
    tax  : { type: mongoose.Schema.Types.Decimal128, required: true },
    total  : { type: mongoose.Schema.Types.Decimal128, required: true},
    status : {type: Number, required: true}, // 'por cobrar', 'cobrada', 'vencida'
    due_date :   { type: Date, required: true }

    }, { collection : 'sales' });


SaleSchema.methods.storeSale = function(callback) {
  this.save(callback)
}

SaleSchema.statics.getSales = function(callback) {
  this.find({},null,
    {
        sort:
        {
            date: -1 //Sort by Date Added DESC
        }
    },
    callback);
}

const SaleModel = mongoose.model('SaleModel', SaleSchema);
 
module.exports = SaleModel;
