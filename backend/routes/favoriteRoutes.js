const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middlewares/AuthMiddleware')
const favoriteController = require('../controllers/favoriteController')
router.post('',AuthMiddleware,favoriteController.addFavorite);
router.get('/:userId/:mangaId',AuthMiddleware, favoriteController.checkFavorite);
router.get('/:userId', favoriteController.getFavorites);
router.delete('/:mangaId', AuthMiddleware, favoriteController.removeFavorite);

module.exports = router;