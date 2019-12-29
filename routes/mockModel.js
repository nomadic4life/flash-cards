require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secret = process.env.JWT_SECRET || "temp";

const loginUser = async user => {
  const username = "username",
    password = "password",
    id = 0;

  const hashPassword = bcrypt.hashSync(user.password, saltRounds);

  if (
    user.username === username &&
    bcrypt.compareSync(password, hashPassword)
  ) {
    const payload = {
      id,
      username
    };

    let userToken;
    await jwt.sign(payload, secret, (err, token) => {
      userToken = token;
    });

    return userToken;
  } else {
    throw new Error();
  }
};

const signupUser = async user => {
  const minPasswordLength = 6;
  const existingUsername = "username";

  const payload = {
    id: 1,
    username: user.username
  };

  if (user.password.includes(" ")) {
    throw { status: 400, message: "password must not contain spaces." };
  } else if (user.password.length < minPasswordLength) {
    throw {
      status: 400,
      message: "password must be a minimum of 6 characters long."
    };
  } else if (user.username.includes(" ")) {
    throw { status: 400, message: "username must not contain spaces." };
  } else if (user.username === existingUsername) {
    throw {
      status: 409,
      message: "username already exist, try another username."
    };
  } else {
    let userToken;
    await jwt.sign(payload, secret, (err, token) => {
      userToken = token;
    });

    return userToken;
  }
};

module.exports = {
  loginUser,
  signupUser
};
