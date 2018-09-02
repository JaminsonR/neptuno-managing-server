const express = require('express');
const router = express.Router();
const UserModel = require('../models/user')
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/neptuno_dev';

const bodyParser = require('body-parser')
const jwt = require('../jwt');
const passport = require("passport");

mongoose.Promise = global.Promise;

function login(req, res) {

 console.log('post recibido')
    sOptions = {
    issuer: "Neptuno Sea food.sa",
    subject: "", 
    audience: "" // this should be provided by client
   }
    mongoose.connect(url,{  useNewUrlParser: true }, function(err){
        if(err) throw err;
        UserModel.find({
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
}




module.exports = {
  login
}
