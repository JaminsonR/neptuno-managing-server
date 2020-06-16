const mongoose = require("mongoose");
const _ = require("lodash");
const errors = require("../config/errors");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ProductSchema = new Schema(
  {
    id: { type: Schema.Types.String, required: true, unique: true },
    name: { type: String, required: true },
    isTaxable: { type: Boolean, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true },
    bulkPrice: { type: mongoose.Schema.Types.Decimal128, required: true },
    stock: {
      type: Number,
      default: 0,
      min: [0, "No debe pasar de cero"],
    },
    isPrime: { type: Boolean, default: true },
  },
  { collection: "products" }
);

ProductSchema.options.toJSON = {
  transform: function (doc, ret) {
    if (ret.price) {
      ret.price = Number(ret.price);
    }
    if (ret.bulkPrice) {
      ret.bulkPrice = Number(ret.bulkPrice);
    }
    delete ret.__v;
    return ret;
  },
};

function UpdateOne(product, self) {
  let { id, name, isTaxable, price, bulkPrice, stock, isPrime } = product;
  return new Promise((resolve, reject) => {
    return self
      .updateOne(
        { id },
        { $set: { id, name, isTaxable, price, bulkPrice, stock, isPrime } }
      )
      .then((state) => {
        resolve(!!state.nModified);
      });
  });
}

ProductSchema.methods = {
  create() {
    return this.save()
      .then((doc) => {
        return Promise.resolve(doc);
      })
      .catch((err) => {
        return Promise.reject(errors.ERROR_HANDLER(err));
      });
  },
};

ProductSchema.statics = {
  getAll() {
    return new Promise((resolve, reject) => {
      this.find({}).exec((err, doc) => {
        if (err) reject(err);
        let products = [];
        for (let product of doc) {
          product["price"] = Number(product["price"]);
          product["bulkPrice"] = Number(product["bulkPrice"]);
          let productTmp = JSON.parse(JSON.stringify(product));
          products.push(productTmp);
        }
        resolve(products);
      });
    });
  },
  getAllById(ids) {
    return new Promise((resolve, reject) => {
      this.find({ id: { $in: ids } }).exec((err, doc) => {
        if (err) reject(err);
        let products = [];
        for (let product of doc) {
          product["price"] = Number(product["price"]);
          product["bulkPrice"] = Number(product["bulkPrice"]);
          let productTmp = JSON.parse(JSON.stringify(product));
          products.push(productTmp);
        }
        resolve(products);
      });
    });
  },
  get(id, select = "-_id") {
    return new Promise((resolve, reject) => {
      this.findOne({ id }).exec((err, doc) => {
        if (err) reject(err);
        let product = doc;
        if (!product) {
          return resolve(null);
        }
        product["price"] = Number(product["price"]);
        product["bulkPrice"] = Number(product["bulkPrice"]);
        let productTmp = JSON.parse(JSON.stringify(product));
        return resolve(productTmp);
      });
    });
  },
  updateBulk(products) {
    return new Promise((resolve, reject) => {
      let promises = [];
      for (let product of products) {
        promises.push(UpdateOne(product, this));
      }
      Promise.all(promises).then((values) => {
        let allWereUpdate = _.every(values);
        if (allWereUpdate) {
          resolve(values);
        } else {
          reject(
            new Error(
              "Por alguna razon no se actualizaron todos??, que debemos hacer???"
            )
          ); // FIXME: hacer transactions en mongodb?
        }
      });
    });
  },
  update({ id, name, price, bulkPrice, isTaxable, stock, isPrime }) {
    let self = this;
    return new Promise((resolve, reject) => {
      return self
        .updateOne(
          { id },
          { $set: { name, price, bulkPrice, isTaxable, stock, isPrime } }
        )
        .then((state) => {
          resolve(!!state.nModified);
        });
    });
  },
};

module.exports = mongoose.model("ProductModel", ProductSchema);
