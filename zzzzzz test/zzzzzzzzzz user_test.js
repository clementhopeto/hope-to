// get an instance of mongoose and mongoose.Schemavar mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
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
    loisir: String
    password: String,
    admin: Boolean
}));
