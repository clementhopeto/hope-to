// get an instance of mongoose and mongoose.Schemavar mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProSchema   = new Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Pro', new Schema({
    name: String,
    prenom: String,
    sexe: String,
    date_naissance: String,
    note: String,
    telephone: Number,
    poste: String,
    doc_id_recto: String,
    doc_id_verso: String,
    interet: String,
    domaine: String,
    loisir: String,
    annee_experience: Number,
    metier: String,
    statut: String,
    societe:
    {
      siret: Number,
      taille: Number,
      adresse:
      {
        ville: String,
        rue: String,
        numero: Number,
        code_postal: Number
      },
    },
    password: String,
    admin: Boolean
}));
