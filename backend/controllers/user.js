const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const sql = require('../models/db')


exports.signup = (req, res, next) => {
  let user = req.body;
  bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash; 
            sql.query('SELECT * from users WHERE email="'+user.email+'"', (err, result) => { // user exist ?
                if(err) throw err; 
                if(result.length >= 1) {
                    return res.status(500).json({ message: "Cette adresse email existe déjà"});
                }
                else { // if user doesn't exist, register a new user
                    sql.query('INSERT INTO users SET ?', user,  (erreur, resultat) => {
                        if (erreur) throw erreur; 
                        return res.status(201).json({ message: 'Vous êtes bien enregistrés, vous allez être redirigé. '});
                    })
                }
            })
        })
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};