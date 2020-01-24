const { userModel } = require('../models');
const StatusError = require('../utils/errors');

const ifUserExist = async (req, res, next) => {
  const { username, email } = req.user;
  const user = await userModel.findUser({ username, email });

  if (user && user.username === username) {
    return next(new StatusError('Username already Taken.', 409));
  }

  if (user && user.email === email) {
    return next(new StatusError('User already exist with specified email.', 409));
  }

  next();
};

module.exports = ifUserExist;
