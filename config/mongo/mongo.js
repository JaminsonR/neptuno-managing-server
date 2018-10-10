const mongoose = require('mongoose')

mongoose.Promise = Promise

var conn
var db
module.exports = {
	connect : (url) => {
		return new Promise( function( resolve ){ 
			let options = {}
		    if (process.env.NODE_ENV === 'production')
		      options = { autoIndex: false }
			//let options = {useNewUrlParser: true}
			conn = mongoose.connect(url, options)
			db = mongoose.connection

			db.on('error', function(err) {
				console.log(`error ${err}`)
			})

			db.on('connected', function() {
				console.log(`app connected to ${url}`)
			})

			db.on('disconnected', function() {
				console.log(`database has been disconnected`)
			})

			process.on('SIGINT', function() {  
			  db.close(function () { 
			    console.log('Mongoose default connection disconnected through app termination'); 
			    process.exit(0); 
			  }); 
			}); 

			resolve(db)
		})
	},


	getDBConnection: () => {
		if (!db){
			console.log("There is no active connection to a DB")
			process.exit(1)

		}
		return db
		},


	disconnect:() =>{
		mongoose.connection.close()
	}
}


