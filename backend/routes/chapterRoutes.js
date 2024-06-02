const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapterController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

// Existing routes...
router.get('/:mangaId',AuthMiddleware, chapterController.getAllChapters);
router.get('/detail/:chapterId',AuthMiddleware, chapterController.getChapterById); // New route
router.post('/',AuthMiddleware, chapterController.createChapter);

module.exports = router;
