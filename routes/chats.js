var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://ad:ad@ds147265.mlab.com:47265/usuariosdelsistema', {
    useMongoClient: true});
var Chats = require('../models/message');
var edge = require('edge');

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


/* GET users listing. */
router.get('/', function(req, res, next) {
  let chats = [];
  Chats.find({}, function(err, userFound) {
    if (err) throw err;
    // object of all the users
    userFound.forEach(function(userFound){
        //console.log(userFound);
        {
            var a;
            DecryptWithDll(userFound.message, function (error, result) {
                if(error) throw error;
                a = result
            });
            userFound.message = a;
        }
      });
    res.send(userFound);
  });
});

router.post('/', function(req, res, next) {
    var a;
    EncryotWithDll(req.body.message, function (error, result) {
        if(error) throw error;
        a = result
    });
    
    let newMessage = new Chats ({
        fromUser: req.body.fromUser,
        toUser: req.body.toUser,
       // message: req.body.message
        message: a
       
    });
    newMessage.save(function(err) {
        if (err) throw err;
        console.log('Message sent successfully!');
    });
    res.status(201).end();
});

module.exports = router;