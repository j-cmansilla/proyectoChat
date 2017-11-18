var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://ad:ad@ds147265.mlab.com:47265/usuariosdelsistema', {
  useMongoClient: true});
var User = require('../models/usuarios');
var jwt_express = require('express-jwt');
var jwt = require('jwt-simple');
var jwt_decode = require('jwt-decode');
var moment = require('moment')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let users = [];
  User.find({}, function(err, userFound) {
    if (err) throw err;
    // object of all the users
    if(checkTokenExpiration())
    {res.send(userFound);}else{
    //res.send(null);
  }
  //req.flash('your session has expired please login again')
  });
});
function checkTokenExpiration (){
  console.log("CHECK TOKEN");
  try{
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
  return true;}
  catch (e){return false;}
}
module.exports = router;
