var fs = require('fs');

let contents = fs.readFileSync('./data/generatedData/data.json');
let jsonContent = JSON.parse(contents);

exports.seed = function (knex) {
  console.log(jsonContent.decks[0]);
  // Deletes ALL existing entries
  return knex('deck')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('deck').insert([
        {
          id: '087e8be3-1fce-45f6-0123-45be63d3ebaf',
          user_id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          category: 'numbers',
          additional_info: "{\"deck_title\":\"quasi reg\",\"thumbnail\":\"http://lorempixel.com/640/480\",\"description\":\"ratione\",\"created_at\":1579726461765,\"updated_at\":1579726461765}"
        },
        {
          id: '087e8be3-1fce-45f6-0132-45be63d3ebaf',
          user_id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          category: 'family',
          additional_info: "{\"deck_title\":\"quasi fad\",\"thumbnail\":\"http://lorempixel.com/640/480\",\"description\":\"ratione\",\"created_at\":1579726461765,\"updated_at\":1579726461765}"
        },
        {
          id: '087e8be3-1fce-45f6-0124-45be63d3ebaf',
          user_id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          category: 'food',
          additional_info: "{\"deck_title\":\"quasi ehkj\",\"thumbnail\":\"http://lorempixel.com/640/480\",\"description\":\"ratione\",\"created_at\":1579726461765,\"updated_at\":1579726461765}"
        },
        ...jsonContent.decks]);
    });
};
