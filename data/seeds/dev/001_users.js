var fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Read Synchrously

let contents = fs.readFileSync('./data/generatedData/data.json');
let jsonContent = JSON.parse(contents);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log(jsonContent.users[0]);
  return knex('user')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          username: 'testuser',
          email: 'testuser@test.com',
          password: bcrypt.hashSync('TestPass', saltRounds)
        },
        {
          id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7c',
          username: 'username',
          email: 'username@test.com',
          password: bcrypt.hashSync('password', saltRounds)
        },
        ...jsonContent.users
      ]);
    });
};
