const StatusError = require("../utils/errors");

const isValidUsername = async (req, res, next) => {
  let { username } = req.user;
  // validate username
  // send error if
  // username includes special chars
  // username must contain latin chars,
  // can have numbers
  // must start with latin chars
  // contain no spaces
  // use regEx to validate

  if (username.includes(" ")) {
    return next(new StatusError("Username must not contain spaces.", 400));
  }

  req.user.username = username;

  next();
};

module.exports = isValidUsername;
