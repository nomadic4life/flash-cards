const { userModel } = require("../models");
const StatusError = require("../utils/errors");

const ifUserExist = async (req, res, next) => {
  const user = await userModel.findUser({ username: req.user.username });

  if (!!user) {
    return next(new StatusError("Username already Taken.", 409));
  }

  next();
};

module.exports = ifUserExist;
