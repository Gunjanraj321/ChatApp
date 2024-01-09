const express = require('express');

const userController = reuire('../controllers/user');
const passwordController = require('../controllers/password');
const mainPageController = require('../controllers/mainPage');
const signController = require('../controllers/signup&signin');
const authController = require('../middleware/authentication');
const multerMiddleware = require('../middleware/multer');
const upload = multerMiddleware.multer.single('image');

const { getHomepage } = require('../controllers/mainPage');

const router = express.Router();

router.post("/signup",signController.userSignup);
router.post("/signin",signController.userSignin);

router.post('/forgotpassword', passwordController.userResetpasswordMail);
router.get('/reset/:forgotId',passwordController.userResetpasswordform);
router.post('/password-reset',passwordController.userResetpassword);


router.post('/post-message',authController.authorization,userController.saveChatHistory);
router.post('/post-image',authController.authorization,upload,userController.getAlluser);

router.get('/get-user',authController.authorization,userController.getcurrentuser)
router.get('/get-users',authController.authorization,userController.getAlluser)

router.get('/get-message',authController.authorization,userController.getUserChatHistory)
router.get('/get-messages',userController.getAllchatHistory);

router.post('/create-group',authController.authorization,userController.createGroup)
router.post('/update-group',authController.authorization,userController.updateGroup)
router.get('/get-groups',userController.getAllgroups)
router.get('/get-mygroups',authController.authorization,userController.getMygroups)
router.get('/get-group',userController.getGroupbyId)
router.get('/get-group-messages',userController.getGroupChatHistory)
router.get('/get-group-members',userController.getGroupMembersbyId)


router.get("/",mainPageController.getMainpage);

module.exports = router;