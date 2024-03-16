const express=require('express');
const skillTestController = require('../controllers/skilltestController');

const router=express.Router();

router.get('/skilltest/:skill',skillTestController);

module.exports=router;