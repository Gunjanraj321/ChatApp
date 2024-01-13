const express = require('express');

const router = express.Router();

const passwordController = require('../controllers/resetPassword')


//route definition for password
router.post('/',passwordController.userResetpasswordMail);
router.get('/:forgotId', passwordController.userResetpasswordform);
router.post('/reset',passwordController.userResetpassword);


module.exports = router;