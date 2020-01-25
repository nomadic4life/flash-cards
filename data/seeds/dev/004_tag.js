var fs = require('fs');

let contents = fs.readFileSync('./data/generatedData/data.json');
let jsonContent = JSON.parse(contents);

exports.seed = function (knex) {
  console.log(jsonContent.tag[0]);
  // Deletes ALL existing entries
  return knex('tag')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tag').insert([...jsonContent.tag]);
    });
};