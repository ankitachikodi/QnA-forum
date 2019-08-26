var constants = require('./Constants');
var jwt = require('jsonwebtoken');

const Auth = () => {}

Auth.checkLogin = (token,callback) => {
    jwt.verify(token, constants.jwtSecret,(err,data) =>{
        if(err){
            callback({error: err});
        }else{
            callback({email: data.email,userid:data.user});
        }
    });
}

module.exports = Auth;