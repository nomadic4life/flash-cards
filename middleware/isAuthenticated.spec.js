const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'temp';
const dummyData = require('../data/mockData');
const isAuthenticated = require('./isAuthenticated');
const StatusError = require('../utils/errors');

describe('/api/list-all, testing auth ,Should return 401 for', () => {
  const user = {
    id: dummyData.users[0].id,
    username: dummyData.users[0].username,
    password: 'TestPass'
  };

  const payload = {
    id: user.id,
    username: user.username
  };

  it('should call next(error) if no auth token givin.', () => {
    const req = {
      headers: {}
    };

    const res = {};

    return isAuthenticated(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(401);
      expect(error.statusMessage).toBe('Token is required.');
    });
  });

  it('should call next(error) if not bearer auth type.', () => {
    const req = {
      headers: {
        authorization: 'basic'
      }
    };

    const res = {};

    return isAuthenticated(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(401);
      expect(error.statusMessage).toBe('Bearer Auth Type is required.');
    });
  });

  it('should call next(error) if invalid token.', () => {
    const req = {
      headers: {
        authorization: 'bearer wrongToken'
      }
    };

    const res = {};

    return isAuthenticated(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(401);
      expect(error.statusMessage).toBe('Invalid token.');
    });
  });

  it('should call next(), auth header set with jwt token', async () => {
    const token = jwt.sign(payload, secret);
    const req = {
      headers: {
        authorization: 'bearer ' + token
      }
    };

    const res = {};

    return new Promise(resolve => {
      isAuthenticated(req, res, err => {
        if (!err) {
          resolve(req);
        }
      });
    }).then(result => {
      expect(result).toHaveProperty('user');
      expect(result.user).toHaveProperty('id', user.id);
      expect(result.user).toHaveProperty('username', user.username);
    });
  });
});
