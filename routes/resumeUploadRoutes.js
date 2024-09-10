const express = require('express');
const uploadController = require('./../controllers/resumeUploadController');
const uploadMiddleware = require('./../middlewares/multerMiddleware');

const router = express.Router();

// Route for uploading files
router.post("/upload-resume", uploadMiddleware.single("file"), uploadController.uploadFile);

module.exports = router;
