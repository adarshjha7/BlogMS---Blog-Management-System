const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        // Automatically hash password when setting it
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      }
    }
  });

  // Add instance method
  User.prototype.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};