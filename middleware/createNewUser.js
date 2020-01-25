const { userModel } = require('../models');

const createNewUser = async (req, res, next) => {
  const { username, email, avatar, password } = req.user;
  const user = await userModel.createUser({ username, email, avatar, password });
  req.user = user;
  next();
};

module.exports = createNewUser;
