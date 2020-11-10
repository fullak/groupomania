const express = require('express');
const router = express.Router();
const bouncer = require('express-bouncer')(500, 900000);
const userCtrl = require('../controllers/user');

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const verifyPassword = require('../middlewares/verifyPasswordStrength');

router.post('/signup', userCtrl.signup);
router.post('/login', bouncer.block, userCtrl.login);
router.get('/profile/:id', auth, userCtrl.getOneUser);
router.put('/:id/', auth, multer, userCtrl.updateImage);

// ! AdminBoard Routes

router.get('/all', auth, userCtrl.getAllUsers);
router.put('/changeRoleToAdmin/:id', userCtrl.changeRoleToAdmin);
router.put('/changeRoleToUser/:id', userCtrl.changeRoleToUser);

module.exports = router;