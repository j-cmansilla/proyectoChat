var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://ad:ad@ds147265.mlab.com:47265/usuariosdelsistema', {
    useMongoClient: true});
var Chats = require('../models/message');
var edge = require('edge');
var jwt_express = require('express-jwt');
var jwt = require('jwt-simple');
var jwt_decode = require('jwt-decode');
var moment = require('moment')


var EncryotWithDll = edge.func({
    assemblyFile: "dlls/Encryption.dll",
    typeName: "Encryption.RSA",
    methodName: "EncryptForP"
});
var DecryptWithDll = edge.func({
    assemblyFile: "dlls/Encryption.dll",
    typeName: "Encryption.RSA",
    methodName: "DecryptForP"
});
function checkTokenExpiration (){
    console.log("CHECK TOKEN");
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
    const token = localStorage.getItem('jwt');
    console.log("checkTokenExpiration: token => " + token);
    if(token == null){return false;}
    var payload = JSON.stringify(jwt.decode(JSON.parse(token),'EST'));
    console.log("checkTokenExpiration: payload => " + payload);
    var Token = JSON.parse(payload);
    console.log("Expiration => "+ Token.Exp);
    console.log("DAte      = > "+Date.now() / 1000);
    if (Token.Exp < Date.now() / 1000) {
      //force logout action here...
      localStorage.clear();
      console.log("jwt => Expired :(");
      return false;
    }
    console.log("jwt => ok :)");
    return true;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(checkTokenExpiration()){
        let chats = [];
        Chats.find({}, function(err, userFound) {
            if (err) throw err;
            // object of all the users
            userFound.forEach(function(userFound){
            // console.log(userFound);
                {
                    var a;
                    DecryptWithDll(userFound.message, function (error, result) {
                        if(error) throw error;
                        //console.log(result);
                        a = result
                    });
                    userFound.message = a;
                }
            });
            res.send(userFound);
        });
    }
});

router.post('/', function(req, res, next) {
    if(checkTokenExpiration()){
        var a;
        EncryotWithDll(req.body.message, function (error, result) {
            if(error) throw error;
        // console.log(result);
            a = result
        });
        let newMessage = new Chats ({
            fromUser: req.body.fromUser,
            toUser: req.body.toUser,
            message: a
        
        });
        newMessage.save(function(err) {
            if (err) throw err;
            console.log('Message sent successfully!');
        });
        res.status(201).end();
    }else{res.status(401).end();}
});

module.exports = router;