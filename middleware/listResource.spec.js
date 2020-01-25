const listResoruce = require('./listResource');

jest.mock('../models');

describe('listResoruce middleware', () => {
  it('should call next() if resource exist.', () => {
    const req = {
      query: {
        resource: 'users'
      }
    };

    const res = {};
    return listResoruce(req, res, () => {
      expect(req).toHaveProperty('data');
      expect(req.data).toHaveProperty('users');
      expect(req.data).toHaveProperty('page');
    });
  });

  it('should call next() users resource by defualt if no resource supplied.', () => {
    const req = {
      query: {}
    };

    const res = {};
    return listResoruce(req, res, () => {
      expect(req).toHaveProperty('data');
      expect(req.data).toHaveProperty('users');
      expect(req.data).toHaveProperty('page');
    });
  });

  it('should call next() users resource by defualt if wrong resource supplied.', () => {
    const req = {
      query: {
        resource: 'fail'
      }
    };

    const res = {};
    return listResoruce(req, res, () => {
      expect(req).toHaveProperty('data');
      expect(req.data).toHaveProperty('users');
      expect(req.data).toHaveProperty('page');
    });
  });
});
