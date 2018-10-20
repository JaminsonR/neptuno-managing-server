const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String },
  middle_name: { type: String },
  family_name: { type: String },
  last_name: { type: String }
  // type: {
  //   type: String,
  //   default: 'usuario',
  //   enum: ['gerente', 'administrador', 'usuario']
  // }
}, { collection: 'users' })

UserSchema.methods = {
  create () {
    let self = this
    return Promise.resolve(self.save())
  }
}

UserSchema.statics = {
  getUser (usedId, callback) {
    this.findOne({ id: usedId }).exec(function (err, users) {
      callback(err, users)
    })
  },
  login (id, password) {
    const self = this
    return new Promise(function (resolve) {
      resolve(self.findOne({ $and: [{ id }, { password }] }))
    })
  }
}

module.exports = mongoose.model('UserModel', UserSchema)
