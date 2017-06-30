// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

    // create a User (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) {

        var user = new User();      // create a new instance of the User model
        user.prenom = req.body.prenom;  // set the users name (comes from the request)
        user.sexe = req.body.sexe;
        user.date_naissance = req.body.date_naissance;
        user.note = req.body.note;
        user.telephone = req.body.telephone;
        user.adresse.ville = req.body.ville;
        user.adresse.rue = req.body.rue;
        user.adresse.numero = req.body.numero;
        user.adresse.code_postal = req.body.code_postal;
        user.lycee.nom = req.body.nom;
        user.lycee.ville = req.body.ville;
        user.grade = req.body.grade;
        user.filiere = req.body.filiere;
        user.interet = req.body.interet;
        user.domaine = req.body.domaine;
        user.loisir = req.body.loisir;

        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
    });

    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
