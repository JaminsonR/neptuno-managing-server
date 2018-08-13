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
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;