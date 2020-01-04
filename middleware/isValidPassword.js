const StatusError = require("../utils/errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const isValidPassword = async (req, res, next) => {
  let { password } = req.user;

  // validate password
  // password can contain
  // latin letters
  // numbers
  // special characters
  // no less than 6 letters
  // lower case and capital letters
  // no spaces
  // use regEx to validate

  if (password.includes(" ")) {
    throw new StatusError("Password must not contain spaces.", 422);
  }

  if (password.length < 6) {
    throw new StatusError("Password must have at least 6 characters.", 422);
  }

  req.user.password = bcrypt.hashSync(password, saltRounds);

  next();
};

module.exports = isValidPassword;
