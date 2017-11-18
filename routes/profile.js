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

router.get('/download/:id', function(req, res, next) {
    var file = 'uploads/'+req.params.id;
    console.log("test");
    console.log(req.params.id);
    if(req.params.id)
    {
        path = req.params.id;
        desc();
        res.download(file, function(err){
            if(err) console.log('ERROR: '+err);
            else console.log('Archivo descargado!');
            comp();
        });
    }
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

router.post('/upload', function(req, res, next) {
	var upload = multer({
        storage: storage
    }).single('fileName');

    upload(req, res, function(err) {
        res.end('File is uploaded')
        path =req.file.originalname;
        comp();
    });
});
router.post('/Logout', function(req, res, next) {
	console.log("Logout .........");
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    }, filename: function (req, file, callback) {
        console.log(file)
        callback(null, file.originalname)
    }
});
var path = "Empty"; 
function comp (){
    console.log("  DLL>>>>")
    console.log("  File name => "+path);
    CompressWithDll( "./uploads/" + path, function (error, result) {
        if(error) console.log(error);
        console.log("  compress result: ");
        console.log(result);
    });
}
function desc(){
    console.log("  DLL>>>>")
    console.log("  File name => "+ "./uploads/" + path +".rlex");
    DecompressWithDll( "./uploads/" + path +".rlex", function (error, result) {
        if(error) console.log(error);
        console.log("  decompress result: ");
        console.log(result);
    });
}
 var upload = multer({ storage: storage });//nop
 
/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("is here");
    res.status(200).end();
  });

module.exports = router;