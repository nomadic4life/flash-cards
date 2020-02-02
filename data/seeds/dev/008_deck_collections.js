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
      return knex('deck_collection').insert([
        {
          deck_id: '087e8be3-1fce-45f6-0123-45be63d3ebaf',
          card_id: 'a133bf86-4b4e-4e08-0123-21955baad2e8'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0123-45be63d3ebaf',
          card_id: '95d2ce6b-0daa-45d3-0123-1958a0e52b8c'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0123-45be63d3ebaf',
          card_id: 'd7700a61-2a81-48ba-0123-40743e35e671'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0123-45be63d3ebaf',
          card_id: 'b06ccb4e-101a-4697-0123-bb5a6397cad3'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0123-45be63d3ebaf',
          card_id: 'be564cf1-5af9-411c-0123-c46fbfb654bb'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0123-45be63d3ebaf',
          card_id: 'b6f88276-b85a-4686-0123-fe88a5c2dae3'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0123-45be63d3ebaf',
          card_id: '181adf35-5a8e-4889-0123-bf422dff2914'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0132-45be63d3ebaf',
          card_id: 'a133bf86-4b4e-4e08-0123-21955baad2e8'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0132-45be63d3ebaf',
          card_id: '95d2ce6b-0daa-45d3-0123-1958a0e52b8c'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0132-45be63d3ebaf',
          card_id: 'd7700a61-2a81-48ba-0123-40743e35e671'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0132-45be63d3ebaf',
          card_id: 'b06ccb4e-101a-4697-0123-bb5a6397cad3'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0132-45be63d3ebaf',
          card_id: 'be564cf1-5af9-411c-0123-c46fbfb654bb'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0124-45be63d3ebaf',
          card_id: 'a133bf86-4b4e-4e08-0123-21955baad2e8'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0124-45be63d3ebaf',
          card_id: 'b6f88276-b85a-4686-0123-fe88a5c2dae3'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0124-45be63d3ebaf',
          card_id: '181adf35-5a8e-4889-0123-bf422dff2914'
        },
        {
          deck_id: '087e8be3-1fce-45f6-0124-45be63d3ebaf',
          card_id: '95d2ce6b-0daa-45d3-0123-1958a0e52b8c'
        },
        ...jsonContent.deckCollection]);
    });
};
