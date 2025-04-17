const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.db.storage,
  logging: console.log
});

const User = require('./user.model')(sequelize, DataTypes);
const Post = require('./post.model')(sequelize, DataTypes);
const Comment = require('./comment.model')(sequelize, DataTypes);

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

Comment.belongsTo(User, { foreignKey: 'userId', as: 'author' });

module.exports = {
  sequelize,
  User,
  Post,
  Comment
};
