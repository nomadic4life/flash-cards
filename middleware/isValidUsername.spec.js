const StatusError = require('../utils/errors');

const isValidUsername = require('./isValidUsername');

describe('isValidUsername middleware', () => {
  it('should throw error for containing spaces', () => {
    const req = {
      user: {
        username: 'test user'
      }
    };

    const res = {};

    return isValidUsername(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(400);
      expect(error.statusMessage).toBe('Username must not contain spaces.');
    });
  });
});
