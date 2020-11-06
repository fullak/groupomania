const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(500, 900000);
const postsCtrl = require('../controllers/posts');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const postsMulter = require('../middlewares/posts-multer');

const verifyPassword = require('../middlewares/verifyPasswordStrength');

router.post('/', postsMulter, postsCtrl.addPost);
router.get('/allPosts', postsCtrl.getAllPosts);
router.get('/:id', postsCtrl.getUserPosts);
router.delete('/:id', postsCtrl.deleteAPost);
router.put('/:id', postsCtrl.like);


module.exports = router;