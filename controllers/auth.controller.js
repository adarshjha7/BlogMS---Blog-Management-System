const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    if (await User.findOne({ where: { email } })) {
      throw new ApiError(400, 'Email already taken');
    }

    const user = await User.create({ username, email, password });
    const token = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    const token = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
};