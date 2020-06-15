const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const ClientSchema = new Schema(
  {
    client_id: { type: String, required: true },
    client_email: { type: String, required: true },
    client_name: { type: String, required: true },
    client_phone: { type: String, required: true },
    client_address: { type: String, required: true },
  },
  { collection: "clients" }
);

ClientSchema.methods = {
  create() {
    return this.save()
      .then((doc) => {
        return Promise.resolve(doc);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },
};

ClientSchema.statics = {
  getAll() {
    return Promise.resolve(this.find({}).exec());
  },
  get(id, select = "-_id") {
    return Promise.resolve(this.findOne({ id }).lean().select(select).exec());
  },
};

module.exports = mongoose.model("ClientModel", ClientSchema);
