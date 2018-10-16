const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
mongoose.Promise = global.Promise;

// create a schema
const ClientSchema = new Schema({
  client_id  :  { type: String, required: true },
  client_name  :  { type: String, required: true },
  client_phone  :  { type: String, required: true },
  client_address  :  { type: String, required: true }
}, { collection : 'clients' });


ClientSchema.methods.storeClient = function(callback) {
  this.save(callback)
}

ClientSchema.statics.getClients = function(callback) {
  this.find({},callback)
}

const ClientModel = mongoose.model('ClientModel', ClientSchema)
 
module.exports = ClientModel
