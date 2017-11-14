var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://ad:ad@ds147265.mlab.com:47265/usuariosdelsistema', {
    useMongoClient: true});
var Chats = require('../models/message');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let chats = [];
  Chats.find({}, function(err, userFound) {
    if (err) throw err;
    // object of all the users
    res.send(userFound);
  });
});

router.post('/', function(req, res, next) {
    let newMessage = new Chats ({
        fromUser: req.body.fromUser,
        toUser: req.body.toUser,
        message: req.body.message
    });
    newMessage.save(function(err) {
        if (err) throw err;
        console.log('Message sent successfully!');
    });
    res.status(201).end();
});

module.exports = router;