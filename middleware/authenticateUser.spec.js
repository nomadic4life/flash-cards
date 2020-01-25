const authenticateUser = require('./authenticateUser');

jest.mock('../models');

describe('authenticateUser middleware', () => {
  it('Should call next() if correct credentials.', () => {
    const req = {
      user: {
        username: 'testuser',
        password: 'TestPass'
      }
    };
    const res = {};
    return authenticateUser(req, res, () => {
      const { id, username } = req.user;
      expect(id).toBe(0);
      expect(username).toBe('testuser');
    });
  });

  it('Should call next(error) if incorrect password.', () => {
    const req = {
      user: {
        username: 'testuser',
        password: 'WrongPass'
      }
    };

    const res = {};

    return authenticateUser(req, res, error => {
      const { status, statusMessage } = error;
      expect(statusMessage).toBe('Invalid Credentials.');
      expect(status).toBe(401);
    });
  });

  it('should call next(error) if non-existent user.', () => {
    const req = {
      user: {
        username: 'wronguser',
        password: 'TestPass'
      }
    };

    const res = {};

    return authenticateUser(req, res, error => {
      const { status, statusMessage } = error;
      expect(statusMessage).toBe('Invalid Credentials.');
      expect(status).toBe(401);
    });
  });
});
