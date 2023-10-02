const express = require('express');
const { register, login, googleAuth, logout } = require('../controllers/authController');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/auth/google').post(googleAuth);
router.route('/user/logout').get(logout);


module.exports = router;
