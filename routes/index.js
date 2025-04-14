const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const postRoutes = require('./post.routes');


const commentRoutes = require('./commentRoutes');

router.use('/auth', authRoutes);
router.use('/posts', postRoutes);


router.use('/comments', commentRoutes);

module.exports = router;