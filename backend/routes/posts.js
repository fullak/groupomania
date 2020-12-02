const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(500, 900000);
const postsCtrl = require('../controllers/posts');
const dashboardCtrl = require('../controllers/dashboard');

const auth = require('../middlewares/auth');
const postsMulter = require('../middlewares/posts-multer');

const verifyPassword = require('../middlewares/verifyPasswordStrength');

// * route Posts
router.post('/', auth, postsMulter, postsCtrl.addPost);
router.post('/isLiked', postsCtrl.likeAPost);
router.get('/allPosts', auth, postsCtrl.getAllPosts);
router.get('/:id', postsCtrl.getUserPosts);
router.get('/:id/likes', postsCtrl.getLikesPerPosts);
router.put('/:id/isFlagged', postsCtrl.flaggedAPost);
router.delete('/posts/:id/:currentImage', dashboardCtrl.deleteAPost);

// * route Comments
router.post('/comments', auth, postsCtrl.postAComment);
router.get('/comments/:id', auth, postsCtrl.getPostComments);
router.put('/comments/:id/isFlagged', postsCtrl.flaggedAComment); 



module.exports = router;