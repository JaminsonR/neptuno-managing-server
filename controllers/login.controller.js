const UserModel = require('../models/user');
const jwt = require('../jwt');
/*
module.exports = {
 login : (usr) => {

 console.log('post recibido')
    sOptions = {
    issuer: "Neptuno Sea food.sa",
    subject: "", 
    audience: "" // this should be provided by client
   }
   console.log(usr['id'])
  
       UserModel.getUser(usr['id'],(err, user) => {
            if(err) throw err;
            if(user)
            {
                if(usr['password'] === user['password'])
                {
                    let user = user.toJSON()
                    sOptions.subject = user['email']
                    sOptions.audience = user['id']
                    console.log(jwt.sign(user,sOptions))
                    return resolve(
                    {
                        state: 200,
                        status: 'success',
                        data: jwt.sign(user,sOptions)
                    })
                }
            }
            return reject (
            {   state: 200,
                status: 'fail',
                message: 'Login Failed'
            }
            )
             
        })
       
       })
}


}

async function doStuff() {
  // ...
}
// doStuff is defined inside the module so we can call it wherever we want

// Export it to make it available outside
module.exports.doStuff = doStuff;*/