const { userModel } = require("../models");
const wrapAsync = require("../utils/wrapAsyncHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = process.env.JWT_SECRET || "temp";
const StatusError = require("../utils/errors");

const isValidAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new StatusError("Username and Password required.", 401);
  }

  const data = authorization.split(" ");

  if (data[0] !== "Basic") {
    throw new StatusError("Basic Auth Type is required.", 401);
  }

  const buff = new Buffer.from(data[1], "base64");
  const text = buff.toString();
  let username = text.split(":")[0];
  let password = text.split(":")[1];

  if (!password || !username) {
    throw new StatusError("Missing Credentials.", 401);
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

const authenticateUser = async (req, res, next) => {
  const { username, password } = req.user;
  const user = await userModel.findUser({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new StatusError("Invalid Credentials.", 401);
  }
  req.user = user;
  next();
};

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
    throw new StatusError("Username must not contain spaces.", 422);
  }

  req.user.username = username;

  next();
};

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

const ifUserExist = async (req, res, next) => {
  const user = await userModel.findUser({ username: req.user.username });

  if (!!user) {
    throw new StatusError("Username already Taken.", 409);
  }

  next();
};

const createNewUser = async (req, res, next) => {
  const { username, password } = req.user;
  const user = await userModel.createUser({ username, password });
  req.user = user;
  next();
};

const generateToken = async (req, res, next) => {
  const { id, username } = req.user;
  const payload = {
    id,
    username
  };

  await jwt.sign(payload, secret, (err, token) => {
    if (err) {
      // no test for this. need to figure out how to add tests for here
      return next(new StatusError("Server Error with Token", 500));
    }
    res.set("Authorization", "bearer " + token);
    next();
  });
};

module.exports = {
  isValidAuth: wrapAsync(isValidAuth),
  authenticateUser: wrapAsync(authenticateUser),
  generateToken: wrapAsync(generateToken),
  isValidUsername: wrapAsync(isValidUsername),
  isValidPassword: wrapAsync(isValidPassword),
  ifUserExist: wrapAsync(ifUserExist),
  createNewUser: wrapAsync(createNewUser)
};
