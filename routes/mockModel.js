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
  return userToken;
};

module.exports = {
  loginUser,
  signupUser
};
