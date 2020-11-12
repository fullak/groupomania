const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(500, 900000);
const dashboardCtrl = require('../controllers/dashboard');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const verifyPassword = require('../middlewares/verifyPasswordStrength');

// *  On user array
router.get('/getAllUsers/', auth, dashboardCtrl.getAllUsers);
router.put('/changeRoleToAdmin/:id', dashboardCtrl.changeRoleToAdmin);
router.put('/changeRoleToUser/:id', dashboardCtrl.changeRoleToUser);
router.delete('/users/:id/:currentImage', multer, dashboardCtrl.deleteAUser);

// * On posts array
router.get('/allPosts/byFlag', dashboardCtrl.getAllPostsByFlag);
router.get('/allPosts/byDate', dashboardCtrl.getAllPostsByDate);
router.delete('/posts/:id', dashboardCtrl.deleteAPost);

// * On comments array
router.get('/allComments', dashboardCtrl.getAllComments);
router.delete('/comments/:id', dashboardCtrl.deleteAComment);

module.exports = router;