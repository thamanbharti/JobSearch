// FavouriteRoute.js
const express = require('express');
const router = express.Router();
const { postFavouriteController ,FavouriteController} = require('../controllers/favouriteController'); // Assuming your controller file is named FavouriteController.js

router.post('/favourite', postFavouriteController);
router.get('/get-favourite/:userId',FavouriteController)


module.exports = router;
