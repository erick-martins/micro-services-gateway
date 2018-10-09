var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User = new Schema({
      Login    : String,
      password : String,
      active   : String
},{
      versionKey: false
});

module.exports = mongoose.model('User', User);