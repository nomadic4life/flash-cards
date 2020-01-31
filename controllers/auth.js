const wrapAsync = require("../utils/wrapAsyncHandler");

// login ::
// validate auth
// sanatize username and password
// check if user exist, if not exist return user not found
// otherwise...
// hash req password compare to db password
// if passwrod doesn't match respond with incorrect credentials
// if password match generate and sign jwt respond 200 with token
const login = async (req, res) => {
  res.status(200).end();
};

// signup ::
// validate auth
// sanatize username and password
// validate username and password, if validation fails return error and message
// check if user exist, if exist return username already taken
// otherwise ...
// create new user
// create token
// send token to client
const signup = async (req, res) => {
  const { user } = req
  res.status(201).json(user);
};

module.exports = {
  login: wrapAsync(login),
  signup: wrapAsync(signup)
};
