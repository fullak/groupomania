const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(500, 900000);
const userCtrl = require('../controllers/user');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postsMulter = require('../middlewares/posts-multer');

const verifyPassword = require('../middlewares/verifyPasswordStrength');

router.post('/signup', userCtrl.signup);
router.post('/login', bouncer.block, userCtrl.login);
router.get('/profile/:id', auth, userCtrl.getOneUser);
router.put('/:id/', auth, multer, userCtrl.updateImage);
router.post('/posts', postsMulter, userCtrl.addPost);
router.get('/posts', userCtrl.getAllPosts);
router.get('/posts/:id', userCtrl.getUserPosts);
router.delete('/posts/:id', userCtrl.deleteAPost);


module.exports = router;