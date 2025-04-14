const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

// No need to `require` upload middleware here — that goes in routes

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      throw new ApiError(404, 'Post not found');
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const postData = {
      title,
      content,
      authorId: req.user.id
    };

    if (req.file) {
      postData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const post = await Post.create(postData);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        authorId: req.user.id
      }
    });

    if (!post) {
      throw new ApiError(404, 'Post not found or not authorized');
    }

    const updateData = {
      title: req.body.title || post.title,
      content: req.body.content || post.content
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
      // Optional: delete old image file from disk
    }

    await post.update(updateData);
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        authorId: req.user.id
      }
    });

    if (!post) {
      throw new ApiError(404, 'Post not found or you are not authorized');
    }

    // Optional: delete image file from disk if needed

    await post.destroy();
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
};
