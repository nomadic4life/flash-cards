const { userModel } = require("../models");

const login = async (req, res) => {
  res.status(200).end();
};

const signup = async (req, res) => {
  res.status(201).end();
};

module.exports = {
  login,
  signup
};

// check if username is valid type,
// check if password is valid type
// username in database, if user exit return username beging used. if username not exit create new user

// login ::
// check if user exist if user not exist respond with incorrect redentials
// if user exist retrive password
// hash req password compare to db password
// if passwrod doesn't match respond with incorrect credentials
// if password match generate and sign jwt respond 200 with token

// signup ::
// validate auth
// sanatize username and password
// validate username and password, if validation fails return error and message
// check if user exist, if exist return username already taken
// otherwise ...
// create new user
// create token
// send token to client
