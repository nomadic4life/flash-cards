var fs = require('fs');

let contents = fs.readFileSync('./data/generatedData/data.json');
let jsonContent = JSON.parse(contents);

exports.seed = function (knex) {
  console.log(jsonContent.category[0]);
  // Deletes ALL existing entries
  return knex('category')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([...jsonContent.category]);
    });
};