const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(500, 900000);
const postsCtrl = require('../controllers/posts');

const auth = require('../middlewares/auth');
const postsMulter = require('../middlewares/posts-multer');

const verifyPassword = require('../middlewares/verifyPasswordStrength');

// * route Posts
router.post('/', auth, postsMulter, postsCtrl.addPost);
router.get('/allPosts', postsCtrl.getAllPosts);
router.get('/:id', postsCtrl.getUserPosts);
router.delete('/:id', auth, postsCtrl.deleteAPost);

// *  route Comments
router.post('/comments', auth, postsCtrl.postAComment);
router.get('/comments/:id', auth, postsCtrl.getPostComments); 



module.exports = router;