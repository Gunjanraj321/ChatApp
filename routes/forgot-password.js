const express = require('express');

const router = express.Router();

const passwordController = require('../controllers/resetPassword')


//route definition for password
router.post('/forgotPassword',passwordController.userResetpasswordMail);
router.get('/forgotPassword/:forgotId', passwordController.userResetpasswordform);
router.post('/forgotPassword/reset',passwordController.userResetpassword);


module.exports = router;