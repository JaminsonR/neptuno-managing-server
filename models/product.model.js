const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
mongoose.Promise = global.Promise;

// create a schema
const ProductSchema = new Schema({
  id  :  { type: String, required: true },
  name  :  { type: String, required: true },
  taxable : {type: Boolean, required: true},
  price  :  { type: mongoose.Schema.Types.Decimal128, required: true }
}, { collection : 'products' });

ProductSchema.methods.storeProduct = function(callback) {
  this.save(callback)
}

ProductSchema.statics.getProducts = function(callback) {
  this.find({},callback);
}

const ProductModel = mongoose.model('ProductModel', ProductSchema);
 
module.exports = ProductModel;
