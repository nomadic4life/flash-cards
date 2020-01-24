const ifUserExist = require('./ifUserExist');
const StatusError = require('../utils/errors');
jest.mock('../models');

describe('ifUserExist middleware', () => {
  it('should call next() if no user exist', () => {
    const req = {
      user: {
        username: 'newUserTest',
        email: 'newtestuser@test.com'
      }
    };

    const res = {};

    return ifUserExist(req, res, () => {
      //   expect(error).toBeInstanceOf(StatusError);
      //   expect(error.status).toBe(4);
      //   expect(error.statusMessage).toBe('Username must not contain spaces.');
      expect(req.user.username).toBe('newUserTest');
      expect(req.user.email).toBe('newtestuser@test.com');
    });
  });

  it('should call next(error) if user with username exist', () => {
    const req = {
      user: {
        username: 'testuser'
      }
    };

    const res = {};

    return ifUserExist(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(409);
      expect(error.statusMessage).toBe('Username already Taken.');
    });
  });

  it('should call next(error) if user with email exist', () => {
    const req = {
      user: {
        email: 'testuser@test.com'
      }
    };

    const res = {};

    return ifUserExist(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(409);
      expect(error.statusMessage).toBe('User already exist with specified email.');
    });
  });
});
