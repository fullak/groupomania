const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(500, 900000);

const userCtrl = require('../controllers/user');

const multer = require('../middlewares/multer-config');

const verifyPassword = require('../middlewares/verifyPasswordStrength');

router.post('/signup', verifyPassword, userCtrl.signup);
router.post('/login', bouncer.block, userCtrl.login);
//router.get('/profile/:id', userCtrl.getOneUser);
//router.put('/:id', multer, userCtrl.update);

module.exports = router;