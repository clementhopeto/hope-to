// get an instance of mongoose and mongoose.Schemavar mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RdvSchema   = new Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Rdv', new Schema({
  date: Date,
  heure: String,
  lieu: String,
  pro: String,
  etudiant: String,
  confirmation_pro: Boolean,
  confirmation_etudiant: Boolean
}));
