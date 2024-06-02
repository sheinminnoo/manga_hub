const Comment = require('../models/Comment');

const commentController = {
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find({ chapterId: req.params.chapterId });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createComment: async (req, res) => {
    try {
      const { text } = req.body;
      const newComment = new Comment({
        chapterId: req.params.chapterId,
        userId: req.user._id,
        text ,
        username : req.user.username
      });
      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateComment: async (req, res) => {
    try {
      const { text } = req.body;
      const comment = await Comment.findById(req.params.commentId);
      if (comment.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      comment.text = text;
      const updatedComment = await comment.save();
      res.status(200).json(updatedComment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (comment.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      await comment.deleteOne();
      res.status(200).json({ message: 'Comment deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = commentController;
