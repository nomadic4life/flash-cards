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
      return knex('card_tags').insert([
        {
          card_id: 'a133bf86-4b4e-4e08-0123-21955baad2e8',
          tag: 'travel'
        },
        {
          card_id: '95d2ce6b-0daa-45d3-0123-1958a0e52b8c',
          tag: 'space'
        },
        {
          card_id: 'd7700a61-2a81-48ba-0123-40743e35e671',
          tag: 'ideas'
        },
        ...jsonContent.card_tags]);
    });
};

