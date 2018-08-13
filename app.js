const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose');
const User = require('./models/user');
 
 const url = 'mongodb://localhost:27017/neptuno_dev';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))


app.get('/api/user/login', (req, res) => {
	console.log('get recibido')
    mongoose.connect(url,{  useNewUrlParser: true }, function(err){
        if(err) throw err;
        User.find({}, function(err, user){
            if(err) throw err;
            console.log(user)
            if(user.length > 0){  
                return res.status(200).json({
                    status: 'success',
                    data: user
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


app.post('/api/user/login', (req, res) => {
	console.log('post recibido')
    mongoose.connect(url,{  useNewUrlParser: true }, function(err){
        if(err) throw err;
        User.find({
            username : req.body.username, password : req.body.password
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


 
app.listen(3000, () => console.log('Neptuno server running on port 3000!'))