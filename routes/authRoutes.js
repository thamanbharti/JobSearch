const express = require('express')

const { registerController, loginController, currentUserController,updateCurrentUserController ,getNotificationController,viewaNotificationController, postNotificationController, clientController} = require('../controllers/authController')
const authMiddelware = require('../middlewares/authMiddleware')
const router = express.Router()

//routes
router.post('/register', registerController);

//Login || post
router.post('/login', loginController);

//GET CURRENT USER || GET 
router.get('/current-user', authMiddelware, currentUserController)
router.get('/getClient',authMiddelware,clientController)
router.post('/postNotification',authMiddelware,postNotificationController)
router.get('/getNotification', authMiddelware, getNotificationController);
router.get('/viewNotification/:notificationId', authMiddelware, viewaNotificationController);

router.put('/current-user/:userId',updateCurrentUserController)

module.exports = router;