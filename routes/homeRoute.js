const express = require('express');
const mainPagecontroler = require('../controllers/mainPage')

const router = express.Router();

// Defining a route for handling GET requests to the root path ('/')
router.get('/',mainPagecontroler.getHomepage);
//Handling Error
router.use('/',mainPagecontroler.getErrorpage);

module.exports = router;