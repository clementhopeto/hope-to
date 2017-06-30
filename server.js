// BASE SETUP
// =============================================================================

// call the packages we need
let express    = require('express');        // call express
let app        = express();                 // define our app using express
let bodyParser = require('body-parser');
let morgan      = require('morgan');
let mongoose    = require('mongoose');

let jwt    = require('jsonwebtoken');          // used to create, sign, and verify tokens
let config = require('./config');              // get our config file
let User   = require('./src/app/models/user'); // get our mongoose model

let http   = require('http'),                  //mail
qs         = require('querystring'),           //mail
nodemailer = require('nodemailer');            //mail

module.exports = require('./src/app/lib/mangopay');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// tell express where to serve static files from
app.use(express.static(__dirname + '/public'));

let port = process.env.PORT || 8080;              // set our port
mongoose.connect('mongodb://localhost/hope_to');  // connect to database
app.set('superSecret', config.secret);            // secret variable

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// ROUTES FOR OUR API
// =============================================================================
let router = express.Router();              // get an instance of the express Router

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        let token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

    // create a User (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) {

        let user = new User();      // create a new instance of the User model
        user.name = req.body.name;  // set the users name (comes from the request)
        user.prenom = req.body.prenom;

        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
    })

    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

// on routes that end in /users/:user_id
// ----------------------------------------------------

router.route('/users/:user_id')

    // get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    // update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
    .put(function(req, res) {

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name;  // update the users info

            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });
        });
    })

    // delete the user with this id (accessed at DELETE http://localhost:8080/api/users/:user_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// route to return all users (GET http://localhost:8080/api/users)
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('its gone work ' + port);  //Magic happens on port

// allow CORS
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }

// MAILLING
//============================================================================
    router.route('/mailing')

        .send = function(email, subject, htmlcontent, callback) {
        let nodemailer = require('nodemailer');
        let smtpTransport = require('nodemailer-smtp-transport');
        let configMail = require('/config').mail;//my json configurations mail

        let transporter = nodemailer.createTransport(smtpTransport({
            host: SSL0.OVH.NET, //mail.example.com (your server smtp)
            port: 993, //instead of port 25 because this port is filtered by many ISP and SSL is activatied
            secureConnection: true, //true or false
            auth: {
                user: 'no.reply@hopeto.fr', /*user@mydomain.com*/
                pass: 'FSp-Wyx-znf-y6n' //password from specific user mail
            }
    }));

        let mailOptions = {
            from: 'no.reply@hopeto.fr',
            to: 'scelles.ugo@gmail.com',
            subject: 'test',
            html: '<p> html content </p>'
    };

        transporter.sendMail(mailOptions, function(err, info){
            transporter.close();
            if(err) {
                callback(err, info);
            }
            else {
                callback(null, info);
            }
        });
    };

    //var Mail = require('../utils/Mail'); //require this module
    Mail.send('[EMAIL TO SEND]', '[TITLE]', '<p> content of mail </p>]', function(err, info) {
        if(err) {
            console.log('email was not sent');//error
        }
        else {
            console.log('email has been sent');//Email has been sent and you can see all information in var info
        }
    });  });

  //END MAILLING
  //============================================================================

// BASE SETUP
// =============================================================================

app.get('/setup', function(req, res) {

  // create a sample user
  let nick = new User({
    name: 'Nick Cerminara',      //champ de form
    password: 'password',        //champ de form
    admin: "true"
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});
