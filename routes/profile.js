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
//var upload = multer({dest:'uploads/'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("is here");
  res.status(200).end();
});

router.post('/download', function(req, res, next) {
    console.log("Archive "+req.body.fileToDownload);
    var pathFile = path.join(__dirname,'..','/uploads/',req.body.fileToDownload);
    console.log(pathFile);
    res.download(pathFile, function(err){
        if(err) console.log('ERROR: '+err);
        else console.log('Archivo descargado!');
    });
    res.status(200).end();
});

router.get('/download:id', function(req, res, next) {
    console.log("Archive "+req.params.id);
    var pathFile = path.join(__dirname,'..','/uploads/',req.params.id);
    console.log(pathFile);
    res.download(pathFile, function(err){
        if(err) console.log('ERROR: '+err);
        else console.log('Archivo descargado!');
    });
    res.status(200).end();
});

router.get('/downloadFile:id', function(req, res, next) {
    console.log('HEHEHEHEHEHE');
    var pathFile = path.join(__dirname,'..','/uploads/',req.params.id);
    console.log("PATHHHHHHHH"+pathFile);
    res.download(pathFile, function(err){
        if(err) console.log('ERROR: '+err);
        else console.log('Archivo descargado!');
    });
    res.status(200).end();
});

router.get('/img', function(req, res) {
    var file = 'uploads/Charizard.png'
    var pathFile = path.join(__dirname,'..','/uploads/','Charizard.png');
    res.download(file);
    res.status(200).end();
});

/*router.post('/upload',upload.single('fileName'),function(req, res, next) {
    console.log("success");
    console.log(req.file);
    res.status(201).end();
});*/
var filePath = ""; //original path
router.post('/upload', function(req, res,next) {
	var upload = multer({
        storage: storage
    }).single('fileName')

	upload(req, res, function(err) {
		res.end('File is uploaded')
    })
    console.log("here");
    console.log(filePath);
   /*CompressWithDll( filePath + "$./uploads", function (error, result) {
        if(error) throw error;
        console.log("compress result: ");
        console.log(result);
    });*/
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
 

module.exports = router;