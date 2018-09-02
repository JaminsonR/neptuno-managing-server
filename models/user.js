const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// create a schema
const userSchema = new Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String },
  middle_name: { type: String },
  family_name: { type: String },
  last_name: { type: String }
}, { collection : 'users' });
 
userSchema.statics.getUser = function(id_user, callback) {
  this.findOne({id: id_user}, callback);
}


const UserModel = mongoose.model('UserModel', userSchema);
 
module.exports = UserModel;