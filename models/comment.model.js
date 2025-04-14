module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 1000]
        }
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      });
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'author',
        onDelete: 'CASCADE'
      });
    };
  
    return Comment;
  };