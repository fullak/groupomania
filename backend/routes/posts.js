const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(500, 900000);
const postsCtrl = require('../controllers/posts');

const auth = require('../middlewares/auth');
const postsMulter = require('../middlewares/posts-multer');

const verifyPassword = require('../middlewares/verifyPasswordStrength');

// * route Posts
router.post('/', auth, postsMulter, postsCtrl.addPost);
router.get('/allPosts', auth, postsCtrl.getAllPosts);
router.get('/allPosts/byFlag', postsCtrl.getAllPostsByFlag);
router.get('/allPosts/byDate', postsCtrl.getAllPostsByDate);
router.get('/:id', postsCtrl.getUserPosts);
router.put('/:id/isLiked', postsCtrl.likeAPost);
router.put('/:id/isFlagged', postsCtrl.flaggedAPost);
router.delete('/:id', auth, postsCtrl.deleteAPost);

// *  route Comments
router.post('/comments', auth, postsCtrl.postAComment);
router.get('/comments/all', auth, postsCtrl.getAllComments);
router.get('/comments/:id', auth, postsCtrl.getPostComments); 



module.exports = router;