const express = require('express');
const { testController } = require('../controllers/testController');
//reouter object
const router = express.Router();

router.get("/", testController)

module.exports = router
