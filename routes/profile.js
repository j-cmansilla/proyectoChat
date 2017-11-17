var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var edge = require('edge');

var CompressWithDll = edge.func({
    assemblyFile: "dlls/Lab1-Compresion-de-Datos.dll",
    typeName: "Lab1_Compresion_de_Datos.Utilities.Compress",
    methodName: "CompressForP"
});

var DecompressWithDll = edge.func({
    assemblyFile: "dlls/Lab1-Compresion-de-Datos.dll",
    typeName: "Lab1_Compresion_de_Datos.Utilities.Compress",
    methodName: "DecompressForP"
});
const nodeRes = require('node-res')
//var upload = multer({dest:'uploads/'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("is here");
  res.status(200).end();
});

router.post('/download', function(req, res, next) {
    console.log("Archive "+req.body.fileToDownload);
    CompressWithDll(req.body.fileToDownload, function (error, result) {
        if(error) throw error;
        console.log(result);
    });
    var pathFile = path.join(__dirname,'..','/uploads/',req.body.fileToDownload);
    console.log(pathFile);
    res.download(pathFile, function(err){
        if(err) console.log('ERROR: '+err);
        else console.log('Archivo descargado!');
    });
});

router.post('/upload', function(req, res,next) {
	var upload = multer({
		storage: storage
	}).single('fileName')
	upload(req, res, function(err) {
		res.end('File is uploaded')
	})
})

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        console.log(file)
		callback(null, file.originalname)
    }
 });
 
 var upload = multer({ storage: storage });
 
/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("is here");
    res.status(200).end();
  });

module.exports = router;