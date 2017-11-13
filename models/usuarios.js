var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
  userName:  String,
  password:  String
});

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;