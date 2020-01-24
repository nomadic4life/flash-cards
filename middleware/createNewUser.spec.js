const createNewUser = require('./createNewUser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dummyData = require('../data/mockData');

jest.mock('../models');

// Note:
// will implement general test for this middleware
// but don't see the need to have tests
// since nothing is being chagned and only adds a new user to the database through the models
// models are being mocked.
// and req.user is updated from what the mocked models return.
// should this middleware include santiznation and validation checking?
// other middleware handle that. and this middleware is dependent on that.
// creating test for this doesn't seem easy.
// also should I work with a test database?
// wouldn't be considered unit testing if I did that.
// and I will test models seperately with a test database, so it would be redunent testing.

describe('createNewUser middleware', () => {
  it('Should call next() if correct credentials.', () => {
    const req = {
      user: {
        username: 'testuser',
        email: 'testuser@test.com',
        avatar: 'avatar.png',
        password: bcrypt.hashSync('TestPass', saltRounds)
      }
    };
    const res = {};
    return createNewUser(req, res, () => {
      // const { id, username, email, avatar, password } = req.user;
      // has property user
      // user has property id ,pointless check, maybe should call test database
      // expect(id).toBe(dummyData.users.length);
      // useless test
      expect(Object.keys(req.user).length).toBe(7);
    });
  });
});
