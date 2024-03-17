const express = require('express')

const { registerController, loginController, currentUserController } = require('../controllers/authController')
const authMiddelware = require('../middlewares/authMiddleware')
const router = express.Router()

//routes
router.post('/register', registerController);

//Login || post
router.post('/login', loginController);

//GET CURRENT USER || GET 
router.get('/current-user', authMiddelware, currentUserController)

router.post('/interest', authMiddelware,)
module.exports = router;