const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bdd = require('../models/db')


exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                firstname: req.body.firstname,
                email: req.body.email,
                password: hash,
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
            console.log('result : ', result);
            bcrypt.compare(user.password, result.password)
                .then(valid => {
                    if (!valid) return res.status(500).json({message: "User or password doesn't match"});
                    res.status(200).json({
                        message: 'Login completed, you will be redirected',
                        token: jwt.sign(
                            {userId: result.id},
                            'RANDOM_TOKEN',
                            {expiresIn: '24h'}
                        ),
                        userId: result.id
                    });
                })
                .catch(() => {
                    return res.status(500).json({message: "An error has occurred"});
                })
        })
    }
};


/*
exports.login = (req, res) => {
    let user = req.body;
    console.log('A');
    console.log(user);
    if (user) {
        bdd.query('SELECT password, id FROM users WHERE email="' + user.email + '"', (err, result) => { // If user exist, look for the password
            if (err) throw err;
            console.log('B')
            console.log(result);
            if (result.length <= 0) {
                return res.status(500).json({message: "User doesn't exist"});
            } else {
                console.log(user.password);
                console.log(result[0]);
                bcrypt.compare(user.password, result[0].password)
                    .then(valid => {
                        if (!valid) return res.status(500).json({message: "User or password do not match"});
                        res.status(200).json({
                            message: 'Login completed, you will be redirected',
                            token: jwt.sign(
                                {userId: result[0].id},
                                'RANDOM_TOKEN',
                                {expiresIn: '24h'}
                            ),
                            userId: result[0].id
                        });
                    })
                    .catch(() => {
                        return res.status(500).json({message: "An error has occurred"});
                    })
            }
        })
    } else {
        return res.status(500).json({message: 'Data transmitted incorrectly'});
    }
};*/
