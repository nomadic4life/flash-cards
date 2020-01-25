const generateToken = require('./generateToken');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'temp';

describe('generateToken middleware', () => {
  it('should call next(), auth header set with jwt token', () => {
    const req = {
      user: {
        id: 0,
        username: 'testuser'
      }
    };
    const res = {
      set: function (key, prop) {
        return (res.headers = {
          [key]: prop
        });
      }
    };

    const payload = {
      id: 0,
      username: 'testuser'
    };

    return new Promise(resolve => {
      generateToken(req, res, err => {
        if (!err) {
          resolve(res);
        }
      });
    }).then(result => {
      let { Authorization } = res.headers;
      Authorization = Authorization.split(' ');
      expect(true).toBe(true);
      expect(res.headers).toHaveProperty('Authorization');
      expect(Authorization[0]).toBe('bearer');
      expect(Authorization[1]).toBe(jwt.sign(payload, secret));
    });
  });
});
