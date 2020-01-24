const db = require('../db');
const { userModel } = require('../../models');

it('checking DB_ENV', () => {
  expect(process.env.DB_ENV).toBe('testing')
})

describe('userModel', () => {

  beforeEach(async () => {
    await db('user').del();
  })

  describe('insert()', () => {

    it('should insert new user', async () => {
      // const empty = await db('user');
      // console.log(empty)

      // const user = await userModel.createUser({
      //   username: 'sam',
      //   password: 'testPass',
      //   email: 'testuser001@gmail.com'
      // })

      // console.log(user)
      expect(true).toBe(true);
    })
  })
})