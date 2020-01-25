const StatusError = require('../utils/errors');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'temp';

const isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new StatusError('Token is required.', 401));
  }

  const token = authorization.split(' ');

  if (token[0].toLowerCase() !== 'bearer') {
    return next(new StatusError('Bearer Auth Type is required.', 401));
  }

  jwt.verify(token[1], secret, (err, decoded) => {
    if (err) {
      return next(new StatusError('Invalid token.', 401));
    }

    req.user = {
      id: decoded.id,
      username: decoded.username
    };
    next();
  });
};

module.exports = isAuthenticated;
