const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(500, 900000);
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');

const multer = require('../middlewares/multer-config');

const verifyPassword = require('../middlewares/verifyPasswordStrength');

router.post('/signup', userCtrl.signup);
router.post('/login', bouncer.block, userCtrl.login);
router.get('/profile/:id', auth, userCtrl.getOneUser);
router.put('/:id/', auth, multer, userCtrl.updateImage);
router.post('/posts', userCtrl.addPost);
router.get('/posts', userCtrl.getAllPosts);
router.get('/posts/:id', userCtrl.getUserPosts);


module.exports = router;