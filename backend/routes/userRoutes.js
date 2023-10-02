const express = require('express');
const { userResponse, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken } = require('../utils/verifyUser');
const router = express.Router();

router.route('/user').post(userResponse)
router.route('/user/update/:id').post(verifyToken, updateUser)
router.route('/user/delete/:id').delete(verifyToken, deleteUser);




module.exports = router;
