const { Comment, Post, User } = require('../models');
const ApiError = require('../utils/ApiError');

const commentController = {
  // Create a new comment
  async createComment(req, res, next) {
    try {
      const { content, postId } = req.body;
      const userId = req.user.id;

      // Check if post exists
      const post = await Post.findByPk(postId);
      if (!post) {
        throw new ApiError(404, 'Post not found');
      }

      const comment = await Comment.create({
        content,
        postId,
        userId
      });

      // Get comment with author details
      const newComment = await Comment.findByPk(comment.id, {
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'username']
        }]
      });

      res.status(201).json(newComment);
    } catch (error) {
      next(error);
    }
  },

  // Get comments for a post
  async getPostComments(req, res, next) {
    try {
      const { postId } = req.params;

      const comments = await Comment.findAll({
        where: { postId },
        include: [{
          model: User,
          as: 'author',
          attributes: ['id', 'username']
        }],
        order: [['createdAt', 'DESC']]
      });

      res.json(comments);
    } catch (error) {
      next(error);
    }
  },

  // Delete a comment
  async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const comment = await Comment.findOne({
        where: { id, userId }
      });

      if (!comment) {
        throw new ApiError(404, 'Comment not found or not authorized');
      }

      await comment.destroy();
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = commentController;