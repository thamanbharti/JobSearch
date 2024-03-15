const express = require('express')
const authMiddelware = require('../middlewares/authMiddleware')
const { createApplicationController, getApplicationController, getFilterControlle, getResume } = require('../controllers/applicationController')

const router = express.Router()

//ADD Application || POST
router.post('/create-application', authMiddelware, createApplicationController);

//GET ALL Application RECORDS
router.get('/get-application', authMiddelware, getApplicationController);
//router.get('/get-resume', authMiddelware, getResume);
router.get('/get-resume/:postedBy', authMiddelware, getResume);
//GET filters 
router.get('/filter', authMiddelware, getFilterControlle);

module.exports = router;