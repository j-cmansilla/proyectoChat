var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://ad:ad@ds147265.mlab.com:47265/usuariosdelsistema', {
  useMongoClient: true});
var User = require('../models/usuarios');

const crypto = require('crypto');
const secret = 'abcdefg';


router.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/profile', function(req, res, next) {
  let newUser = new User ({
    userName: req.body.userNameLogin,
    password: crypto.createHmac('sha256', secret)
    .update(req.body.passwordLogin)
    .digest('hex')
  });
  User.find({"userName":newUser.userName, "password":newUser.password}, function(err, userFound) {
    if (err) throw err;
    // object of all the users
    if(userFound[0]){
      res.render('profile', { userName: userFound[0].userName , userToSend:"Please select a chat..."});
    }else{
      res.render('login', { title: 'Express' });
    }
    res.status(201).end();
  });
});

router.post('/register', function(req, res, next) {
  let newUser = new User ({
    userName: req.body.userName,
    password: crypto.createHmac('sha256', secret)
    .update(req.body.password)
    .digest('hex')
  });

  User.find({"userName":newUser.userName}, function(err, userFound) {
    if (err) throw err;
    // object of all the users
    if(userFound[0]){
      console.log("This user already exists! => "+userFound[0].userName);
    }else{
      newUser.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully!');
      });
    }
    res.status(201).end();
  });
  res.render('login', { title: 'Express' });
});

module.exports = router;
