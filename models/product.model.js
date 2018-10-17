const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const ProductSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  taxable: { type: Boolean, required: true }, // con iva o no
  price: { type: mongoose.Schema.Types.Decimal128, required: true }
}, { collection: 'products' })

ProductSchema.methods.storeProduct = function (callback) {
  this.save(callback)
}

ProductSchema.statics.getProducts = function (callback) {
  this.find({}, callback)
}

module.exports = mongoose.model('ProductModel', ProductSchema)
