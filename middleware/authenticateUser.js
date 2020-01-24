const { userModel } = require('../models');
const bcrypt = require('bcrypt');
const StatusError = require('../utils/errors');

const authenticateUser = async (req, res, next) => {
  const { username, password } = req.user;
  const user = await userModel.findUser({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    // throw new StatusError('Invalid Credentials.', 401);
    return next(new StatusError('Invalid Credentials.', 401));
  }
  req.user = user;
  next();
};

module.exports = authenticateUser;
