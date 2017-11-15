var express = require('express');
var router = express.Router();
var multer = require('multer');

var upload = multer({dest:'uploads/'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("is here");
  res.status(200).end();
});

router.post('/upload',upload.single('myFile') ,function(req, res, next) {
    console.log(req);
    res.status(200).end();
});

module.exports = router;