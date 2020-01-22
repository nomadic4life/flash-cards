var fs = require('fs');

let contents = fs.readFileSync('./data/generatedData/data.json');
let jsonContent = JSON.parse(contents);

exports.seed = function (knex) {
  console.log(jsonContent.card_tags[0]);
  // Deletes ALL existing entries
  return knex('card_tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('card_tags').insert([...jsonContent.card_tags]);
    });
};

