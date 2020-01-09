const StatusError = require("../utils/errors");

const isValidAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new StatusError("Username and Password required.", 401));
  }

  const data = authorization.split(" ");

  if (data[0].toLowerCase() !== "basic") {
    return next(new StatusError("Basic Auth Type is required.", 401));
  }

  const buff = new Buffer.from(data[1], "base64");
  const text = buff.toString();
  let username = text.split(":")[0];
  let password = text.split(":")[1];

  if (!password || !username) {
    return next(new StatusError("Missing Credentials.", 401));
  }

  // sanatize username
  username = username.trim().toLowerCase();

  // sanatize password
  password = password.trim();

  req.user = {
    username,
    password
  };

  next();
};

module.exports = isValidAuth;
