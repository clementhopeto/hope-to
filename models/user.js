// get an instance of mongoose and mongoose.Schemavar mongoose     = require('mongoose');
let mongoose = require('mongoose');
let Schema       = mongoose.Schema;
let UsersSchema   = new Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
  psedo: String,
  name: String,
  prenom: String,
  sexe: String,
  date_naissance: String,
  note: String,
  telephone: Number,
  adresse:
    {
      ville: String,
      rue: String,
      numero: Number,
      code_postal: Number
    },
  lycee:
    {
      nom: String,
      ville: String
    },
  grade: String,
  filiere: String,
  interet: String,
  domaine: String,
  loisir: String,
  rdv:
    {
      participent_1: String,
      participent_2: String,
      date:Date,
      confirmation_1: Boolean,
      confirmation_2: Boolean,
    },

  password: String,
  admin: Boolean
}));
