var fs = require('fs');

let contents = fs.readFileSync('./data/generatedData/data.json');
let jsonContent = JSON.parse(contents);

exports.seed = function (knex) {
  console.log(jsonContent.language[0]);
  // Deletes ALL existing entries
  return knex('language')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('language').insert([...jsonContent.language]);
    });
};