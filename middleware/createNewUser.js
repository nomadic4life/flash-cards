const { userModel } = require('../models');

const createNewUser = async (req, res, next) => {
  const { username, email, avatar, password } = req.user;
  const path = 'http://localhost:4080/uploads/avatar/';
  const user = await userModel.createUser({ username, email, avatar, password, path });
  req.user = user;
  next();
};

module.exports = createNewUser;
