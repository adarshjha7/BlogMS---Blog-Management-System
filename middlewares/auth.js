const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;