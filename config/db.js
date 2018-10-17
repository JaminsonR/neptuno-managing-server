const mongoose = require('mongoose')
mongoose.promise = global.Promise
mongoose.set('useCreateIndex', true)
const { isTesting } = require('./index')

var db
module.exports = {
  connect: (url) => {
    return new Promise(function (resolve) {
      let options = { useNewUrlParser: true }
      if (process.env.NODE_ENV === 'production') {
        options = { autoIndex: false }
      }
      mongoose.connect(url, options)
      db = mongoose.connection

      db.on('error', function (err) {
        console.log(`error ${err}`)
      })

      db.on('connected', function () {
        if (!isTesting) {
          console.log(`app connected to ${url}`)
        }
      })

      db.on('disconnected', function () {
        console.log(`database has been disconnected`)
      })

      process.on('SIGINT', function () {
        db.close(function () {
          console.log('Mongoose default connection disconnected through app termination')
          process.exit(0)
        })
      })
      resolve(db)
    })
  },
  disconnect: () => {
    mongoose.connection.close()
  },
  clean () {
    Promise.resolve(mongoose.connection.dropDatabase())
  }
}
