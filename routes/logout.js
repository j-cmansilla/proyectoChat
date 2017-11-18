var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log('cerrar sesion');
    res.render('login');
});

module.exports = router;