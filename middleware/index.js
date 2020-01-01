const { userModel } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = process.env.JWT_SECRET || "temp";
const StatusError = require("../utils/errors");

const validAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new StatusError("Username and Password required.", 401);
  }

  const data = authorization.split(" ");

  if (data[0] !== "Basic") {
    throw new StatusError("Basic Auth Type is required.", 401);
  }

  const buff = new Buffer(data[1], "base64");
  const text = buff.toString();
  const username = text.split(":")[0];
  const password = text.split(":")[1];

  if (!password || !username) {
    throw new StatusError("Missing Credentials.", 401);
  }

  // sanatize username and password
  // no spaces for username and password - trim
  // lowercase for username

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
    req.token = token;
    next();
  });
};

module.exports = {
  validAuth,
  authenticateUser,
  generateToken
};
