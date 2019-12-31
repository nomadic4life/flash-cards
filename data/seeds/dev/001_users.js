const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user").insert([
        {
          username: "testuser",
          password: bcrypt.hashSync("TestPass", saltRounds)
        },
        {
          username: "username",
          password: bcrypt.hashSync("password", saltRounds)
        }
      ]);
    });
};
