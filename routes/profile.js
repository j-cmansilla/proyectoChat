var express = require('express');
var router = express.Router();
var multer = require('multer');
var uploadFile = require('express-fileupload');
router.use(uploadFile);

var upload = multer({dest:'uploads/'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("is here");
  res.status(200).end();
});

/*router.post('/upload',function(req, res, next) {
    console.log('ENTRO!');
    if(req.file){
        var file = req.file.filename,
        filename = file.name;
        file.mv("./uploads/"+filename);
        console.log("archivo guardado!")
    }
});*/
router.post('/upload',upload.single('fileName'),function(req, res, next) {
    console.log(req.file);
});

module.exports = router;