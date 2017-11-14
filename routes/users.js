var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://ad:ad@ds147265.mlab.com:47265/usuariosdelsistema', {
  useMongoClient: true});
var User = require('../models/usuarios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = [];
  User.find({}, function(err, userFound) {
    if (err) throw err;
    // object of all the users
    res.send(userFound);
  });
});

module.exports = router;
