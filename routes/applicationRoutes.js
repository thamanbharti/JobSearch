const express = require('express')
const authMiddelware = require('../middlewares/authMiddleware')
const { createApplicationController, getApplicationController, getFilterControlle, getResume } = require('../controllers/applicationController')

const router = express.Router()


router.post('/create-application', createApplicationController);


router.get('/get-application', authMiddelware, getApplicationController);
//router.get('/get-resume', authMiddelware, getResume);
router.get('/get-resume/:postedBy', authMiddelware, getResume);
//GET filters 
router.get('/filter', authMiddelware, getFilterControlle);

module.exports = router;