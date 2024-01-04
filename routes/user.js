const express = require('express');

const signController = require('../controllers/signup&signin');
const authController = require('../middleware/authentication');
const { getHomepage } = require('../controllers/mainPage');

const router = express.Router();

router.post("/signup",signController.userSignup);
router.post("/signin",signController.userSignin);

router.get("/",getHomepage);

module.exports = router;