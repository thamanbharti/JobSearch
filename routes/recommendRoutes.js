const express = require('express');
const router = express.Router();
const recommendController=require('../controllers/recommendController')

router.post('/recommended',recommendController);

module.exports=router;