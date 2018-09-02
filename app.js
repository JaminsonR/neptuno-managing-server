const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const passport = require("passport");
const mongoose = require('mongoose');
const User = require('./models/user');
const url = 'mongodb://localhost:27017/neptuno_dev';
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

app.use(passport.initialize());

const jwt = require('./jwt');



const api = express()
require('./app_api/routes.api')(api)
app.use('/api', api)



// User lookup
app.get('/api/user/login', (req, res) => {
	console.log('get recibido')
    mongoose.connect(url,{  useNewUrlParser: true }, function(err){
        if(err) throw err;
        User.find({}, function(err, users){
            if(err) throw err;
            console.log(users)
            if(users.length > 0){  
                return res.status(200).json({
                    status: 'success',
                    data: users
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    data: 'No users found'
                })
            }
             
        })
    });
})
 

// add new user
 app.post('/api/user/registro', (req, res) => {
	console.log('put recibido')
	console.log(req)
    mongoose.connect(url,{useNewUrlParser: true}, function(err){
        if(err) throw err;
        User.create({
        id: req.body.id, password : req.body.password, first_name : req.body.first_name, middle_name : req.body.middle_name, family_name : req.body.family_name, last_name : req.body.last_name
        }, function(err, user){
            if(err) throw err;
            if(user.length === 1){  
                return res.status(200).json({
                    status: 'success',
                    data: user
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }
             
        })
    });
})

/*
// user login
app.post('/api/user/login', (req, res) => {
    console.log('post recibido')
    sOptions = {
    issuer: "Neptuno Sea food.sa",
    subject: "", 
    audience: "" // this should be provided by client
   }
    mongoose.connect(url,{  useNewUrlParser: true }, function(err){
        if(err) throw err;
        User.find({
            username : req.body.username, password : req.body.password
        }, function(err, users){
            if(err) throw err;
            if(users.length === 1){
                let user = users[0].toJSON()
                sOptions.subject = user['email']
                sOptions.audience = user['id']
                console.log(jwt.sign(user,sOptions))
                return res.status(200).json({
                    status: 'success',
                    data: jwt.sign(user,sOptions)
                })
            } else {
                return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
                })
            }
             
        })
    });
})

 */
app.listen(3000, () => console.log('Neptuno server running on port 3000!'))