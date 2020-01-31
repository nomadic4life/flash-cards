var fs = require('fs');

let contents = fs.readFileSync('./data/generatedData/data.json');
let jsonContent = JSON.parse(contents);

exports.seed = function (knex) {
  console.log(jsonContent.deck_tags[0]);
  // Deletes ALL existing entries
  return knex('deck_tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('deck_tags').insert([
        {
          deck_id: '087e8be3-1fce-45f6-0123-45be63d3ebaf',
          tag: 'travel'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0132-45be63d3ebaf',
          tag: 'space'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0124-45be63d3ebaf',
          tag: 'ideas'
        },
        ...jsonContent.deck_tags]);
    });
};