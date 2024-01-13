const express = require('express');

const router = express.Router();
const signController = require('../controllers/signup&signin');
// const mainPageController = require('../controllers/mainPage');



//route definition for signin and signup
router.post('/signup',signController.userSignup);
router.post('/signin',signController.userSignin);

//route definition for redirecting to main page
// router.get('/',mainPageController.getMainpage)

module.exports = router;