// get an instance of mongoose and mongoose.Schemavar mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PrestationSchema   = new Schema({
  prestation: String,
  description: String,
  prix: Number
});

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Prestation', new Schema({
  prestation: String,
  description: String,
  prix: Number
}));
