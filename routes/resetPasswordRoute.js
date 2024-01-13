const express = require('express');

const router = express.Router();

const passwordController = require('../controllers/resetPassword')


//route definition for password

router.get('/:forgotId', passwordController.userResetPasswordForm);
router.post('/',passwordController.userResetPasswordMail);
router.post('/reset',passwordController.userResetPassword);


module.exports = router;