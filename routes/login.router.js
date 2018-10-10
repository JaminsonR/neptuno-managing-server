var router = require('express').Router()
var LoginController = require('../controllers/login.controller')
const mongo = require('../config/mongo/mongo')
let db = mongo.getDBConnection()
const UserModel = require('../models/user');


router.
route('/login')
	.post((req,res) => {
		let user = req.body
		/*
		LoginController.login(user).then((resp) => 
		{
			res.status(resp.state).json(resp)
		}).catch((err, resp) => 
		{
			logger.error(err)
			res.status(resp.state).json(resp)
		})


		*/
	console.log('post recibido')
    sOptions = {
    issuer: "Neptuno Sea food.sa",
    subject: "", 
    audience: "" // this should be provided by client
   }
   console.log(req.body['id'])
       UserModel.getUser(req.body['id'],(err, usr) => {
            if(err) throw err;
	        if(usr)
	        {
	          	if(usr['password'] === req.body['password'])
	           	{
		           	let user = usr.toJSON()
		            sOptions.subject = user['email']
		            sOptions.audience = user['id']

		            return res.status(200).json({
		                status: 'success',
		                data: ""
		            }).end()
		        }
	        }
	        return res.status(200).json(
	        {
	            status: 'fail',
	            message: 'Login Failed'
	        }).end()
             
        })
    
	})

module.exports = router;
