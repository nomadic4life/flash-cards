const isAuthenticated = require("./isAuthenticated");
const isValidAuth = require("./isValidAuth");
const isValidUsername = require("./isValidUsername");
const isValidPassword = require("./isValidPassword");
const ifUserExist = require("./ifUserExist");
const authenticateUser = require("./authenticateUser");
const createNewUser = require("./createNewUser");
const generateToken = require("./generateToken");
const listResource = require("./listResource");

const wrapAsync = require("../utils/wrapAsyncHandler");

module.exports = {
  isValidAuth: wrapAsync(isValidAuth),
  authenticateUser: wrapAsync(authenticateUser),
  generateToken: wrapAsync(generateToken),
  isValidUsername: wrapAsync(isValidUsername),
  isValidPassword: wrapAsync(isValidPassword),
  ifUserExist: wrapAsync(ifUserExist),
  createNewUser: wrapAsync(createNewUser),
  isAuthenticated: wrapAsync(isAuthenticated),
  listUsers: wrapAsync(listUsers),
  listResource: wrapAsync(listResource)
};
