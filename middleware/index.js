const isAuthenticated = require('./isAuthenticated');
const isValidAuth = require('./isValidAuth');
const isValidUsername = require('./isValidUsername');
const isValidPassword = require('./isValidPassword');
const ifUserExist = require('./ifUserExist');
const authenticateUser = require('./authenticateUser');
const createNewUser = require('./createNewUser');
const isValidEmail = require('./isValidEmail');
const generateToken = require('./generateToken');
const listResource = require('./listResource');

const wrapAsync = require('../utils/wrapAsyncHandler');

const augmentAsync = middleware => {
  const wrappedMiddleware = {};
  for (let mod in middleware) {
    wrappedMiddleware[mod] = wrapAsync(middleware[mod]);
  }
  return wrappedMiddleware;
};

module.exports = augmentAsync({
  isValidAuth,
  authenticateUser,
  generateToken,
  isValidUsername,
  isValidPassword,
  ifUserExist,
  createNewUser,
  isValidEmail,
  isAuthenticated,
  listResource
});
