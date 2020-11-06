const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const sql = require('../models/db');
const fs = require('fs');


exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                firstname: req.body.firstname,
                email: req.body.email,
                password: hash,
                birthday: req.body.birthday,
            });
            User.create(user, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "An error has appeared"
                    });
                    return;
                }
                res.send(data);
            })
        })
};

exports.login = (req, res) => {
    const user = req.body;
    if (user) {
        User.getOne(user, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "An error has appeared"
                });
                return;
            }
            bcrypt.compare(user.password, result.password)
                .then(valid => {
                    if (!valid) return res.status(500).json({ message: "User or password doesn't match" });
                    res.status(200).json({
                        message: 'Login completed, you will be redirected',
                        token: jwt.sign(
                            { userId: result.id },
                            'RANDOM_TOKEN',
                            { expiresIn: '24h' }
                        ),
                        userId: result.id
                    });
                })
                .catch(() => {
                    return res.status(500).json({ message: "An error has occurred" });
                })
        })
    }
};

exports.getOneUser = (req, res, next) => {
    sql.query('SELECT * FROM users WHERE id="' + req.params.id + '"', (err, result) => {
        if (err) throw err;
        console.log(result);
        return res.status(200).json(result);
    })
};

exports.updateImage = (req, res, next) => {

    let imageToUpload = `${req.protocol}://${req.get('host')}/profile/${req.file.filename}`
    let imageToDelete = req.body.currentImage.split('/profile/')[1];

    console.log(imageToDelete);

    if (imageToDelete != "default.png") { // Pas de suppression de fichier si l'utilisateur a encore l'avatar de base
        fs.unlink(`images/profile/${imageToDelete}`, () => {
        })
    }

    sql.query('UPDATE users SET image="' + imageToUpload + '" WHERE id="' + req.body.userId + '"', (err, result) => {
        if (err) throw err;
        return res.status(201).json({ message: 'Avatar changé ' })
    })

};