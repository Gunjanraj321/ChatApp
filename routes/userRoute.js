//importing package
const express = require('express');

//importing modules
const userController = require('../controllers/user')
const mainPageController = require('../controllers/mainPage')
const signController = require('../controllers/signup&signin')
const authController = require('../middleware/authentication')
const multerMiddleware = require('../middleware/multer')
const upload = multerMiddleware.multer.single('image');

//initializing route
const router = express.Router();


// //route definition for signin and signup
// router.post('/signup',signController.userSignup);
// router.post('/signin',signController.userSignin);



//route definition for password
// router.post('/forgotpassword',passwordController.userResetpasswordMail)
// router.get('/reset/:forgotId', passwordController.userResetpasswordform)
// router.post('/password-reset',passwordController.userResetpassword)



//route definition for posting mesage and image
router.post('/post-message',authController.authorization,userController.saveChatHistory)
router.post('/post-image',authController.authorization,upload,userController.saveChatImages)


//route definition for getting user 
router.get('/get-user',authController.authorization,userController.getcurrentuser)
router.get('/get-users',authController.authorization,userController.getAlluser)


//route defintion for chat-history
router.get('/get-message',authController.authorization,userController.getUserChatHistory);
router.get('/get-messages',userController.getAllChatHistory);


//route definition for groups
router.post('/create-group',authController.authorization,userController.createGroup)
router.post('/update-group',authController.authorization,userController.updateGroup)
router.get('/get-groups',userController.getAllgroups)
router.get('/get-mygroups',authController.authorization,userController.getMygroups)
router.get('/get-group',userController.getGroupbyId)
router.get('/get-group-messages',userController.getGroupChatHistory)
router.get('/get-group-members',userController.getGroupMembersbyId)


//route definition for redirecting to main page
router.get('/',mainPageController.getMainpage)

module.exports = router;