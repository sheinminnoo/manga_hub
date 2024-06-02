const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.get('/:chapterId/comments', AuthMiddleware,commentController.getAllComments);
router.post('/:chapterId/comments', AuthMiddleware, commentController.createComment);
router.put('/:chapterId/comments/:commentId', AuthMiddleware, commentController.updateComment);
router.delete('/:chapterId/comments/:commentId', AuthMiddleware, commentController.deleteComment);

module.exports = router;

//http://localhost:5000/api/comments/${chapterId}/comments