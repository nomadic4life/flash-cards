const { userModel } = require("../models");

const createNewUser = async (req, res, next) => {
  const { username, password } = req.user;
  const user = await userModel.createUser({ username, password });
  req.user = user;
  next();
};

module.exports = createNewUser;
