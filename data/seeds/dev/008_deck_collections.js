var fs = require('fs');

let contents = fs.readFileSync('./data/generatedData/data.json');
let jsonContent = JSON.parse(contents);

exports.seed = function (knex) {
  console.log(jsonContent.deckCollection[0]);

  // Deletes ALL existing entries
  return knex('deck_collection')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('deck_collection').insert([...jsonContent.deckCollection]);
    });
};