const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  taxable: { type: Boolean, required: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  stock: { type: Number, default: 0 },
  isPrime: { type: Boolean, default: true }
}, { collection: 'products' })

// ProductSchema.set('toJSON', {
//   getters: true,
//   transform: (doc, ret) => {
//     if (ret.price) {
//       ret.price = Number(ret.price)
//     }
//     delete ret.__v
//     return ret
//   }
// })

// ProductSchema.virtual('price').get(function () {
//   return Number(this.price)
// })

ProductSchema.options.toJSON = {
  transform: function (doc, ret) {
    if (ret.price) {
      ret.price = Number(ret.price)
    }
    delete ret.__v
    return ret
  }
}

ProductSchema.methods = {
  create () {
    return this.save().then((doc) => {
      return Promise.resolve(doc)
    }).catch((err) => {
      return Promise.reject(err)
    })
  }
}

ProductSchema.statics = {
  getAll () {
    return new Promise((resolve, reject) => {
      this.find({}).exec((err, doc) => {
        if (err) reject(err)
        let products = []
        for (let product of doc) {
          product['price'] = Number(product['price'])
          let productTmp = JSON.parse(JSON.stringify(product))
          products.push(productTmp)
        }
        resolve(products)
      })
    })
  },
  get (id, select = '-_id') {
    return new Promise((resolve, reject) => {
      this.findOne({ id }).exec((err, doc) => {
        if (err) reject(err)
        let product = doc
        if (!product) {
          return resolve(null)
        }
        product['price'] = Number(product['price'])
        let productTmp = JSON.parse(JSON.stringify(product))
        return resolve(productTmp)
      })
    })
  }
}

module.exports = mongoose.model('ProductModel', ProductSchema)
