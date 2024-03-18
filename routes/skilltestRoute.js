const express=require('express');
const skillTestController = require('../controllers/skilltestController');
const postQuestionController = require('../controllers/skilltestController');
const router=express.Router();

router.get('/:skill',skillTestController);
router.post('/questions',postQuestionController);
module.exports=router;