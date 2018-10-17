const { isTesting } = require('./config')
process.on('uncaughtException', (err) => {
  console.error('Caught exception: ' + err)
  console.error(err.stack)
})

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const morgan = require('morgan')
const passport = require('passport')
// const mongoose = require('mongoose') // FIX delete

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(compression())
app.use(passport.initialize())

if (!isTesting) {
  app.use(morgan('tiny'))
}

const api = express()
require('./routes')(api)
app.use('/api', api)

// FIX this....

// // User lookup
// app.get('/api/user/login', (req, res) => {
// 	console.log('get recibido')
//     mongoose.connect(url,{  useNewUrlParser: true }, function(err){
//         if(err) throw err;
//         User.find({}, function(err, users){
//             if(err) throw err;
//             console.log(users)
//             if(users.length > 0){  
//                 return res.status(200).json({
//                     status: 'success',
//                     data: users
//                 })
//             } else {
//                 return res.status(200).json({
//                     status: 'fail',
//                     data: 'No users found'
//                 })
//             }
             
//         })
//     });
// })
 

// // add new user
//  app.post('/api/user/registro', (req, res) => {
// 	console.log('put recibido')
// 	console.log(req)
//     mongoose.connect(url,{useNewUrlParser: true}, function(err){
//         if(err) throw err;
//         User.create({
//         id: req.body.id, password : req.body.password, first_name : req.body.first_name, middle_name : req.body.middle_name, family_name : req.body.family_name, last_name : req.body.last_name
//         }, function(err, user){
//             if(err) throw err;
//             if(user.length === 1){  
//                 return res.status(200).json({
//                     status: 'success',
//                     data: user
//                 })
//             } else {
//                 return res.status(200).json({
//                     status: 'fail',
//                     message: 'Login Failed'
//                 })
//             }
             
//         })
//     });
// })

module.exports = app
