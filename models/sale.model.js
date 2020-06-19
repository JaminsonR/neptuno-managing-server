const mongoose = require("mongoose");
const errors = require("../config/errors");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const SaleSchema = new Schema(
  {
    client_id: { type: String, required: true },
    date: { type: Date, required: true },
    client_name: { type: String, required: true },
    client_phone: { type: String, required: true },
    client_address: { type: String, required: true },
    items: [],
    subtotal: { type: mongoose.Schema.Types.Decimal128, required: true },
    tax: { type: mongoose.Schema.Types.Decimal128, required: true },
    discount: { type: mongoose.Schema.Types.Decimal128, required: true },
    total: { type: mongoose.Schema.Types.Decimal128, required: true },
    status: { type: String, required: true }, // 'receivable', 'charged', 'expired'
    due_date: { type: Date, required: true },
  },
  { collection: "sales" }
);

SaleSchema.methods = {
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

SaleSchema.statics = {
  getAll() {
    return new Promise((resolve, reject) => {
      this.find({}, null, { sort: { date: -1 } }).exec((err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  },
  getPerMonth() {
    return new Promise((resolve, reject) => {
      this.aggregate([
        {
          $group: {
            _id: { $month: "$date" },
            total: { $sum: "$total" },
            count: { $sum: 1 },
          },
        },
        {
          $project: { date: "$_id", total: "$total" },
        },
      ]).exec((err, doc) => {
        if (err) reject(err);
        resolve(doc);
      });
    });
  },
  getFromMonth(year, month) {
    return new Promise((resolve, reject) => {
      this.aggregate([{ $match: { date: year + "-" + month } }]).exec(
        (err, doc) => {
          if (err) reject(err);
          resolve(doc);
        }
      );
    });
  },
  get(id, select = "-_id") {
    return new Promise((resolve, reject) => {
      this.findOne({ id }).exec((err, doc) => {
        if (err) reject(err);
        return resolve(doc);
      });
    });
  },
};

module.exports = mongoose.model("SaleModel", SaleSchema);
