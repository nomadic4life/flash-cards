var fs = require('fs');

let contents = fs.readFileSync('./data/generatedData/data.json');
let jsonContent = JSON.parse(contents);

exports.seed = function (knex) {
  console.log(jsonContent.cardCollection[0]);
  // Deletes ALL existing entries
  return knex('user_card')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('user_card').insert([
        {
          id: 'a133bf86-4b4e-4e08-0123-21955baad2e8',
          user_id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          card_id: '0b1e2f78-048d-419d-9d92-3932ff617f94',
          failed_attempts: 0,
          successful_attempts: 0
        },
        {
          id: '95d2ce6b-0daa-45d3-0123-1958a0e52b8c',
          user_id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          card_id: 'c40e42ad-f3dc-4393-8e7a-445f120f0d1c',
          failed_attempts: 0,
          successful_attempts: 0
        },
        {
          id: 'd7700a61-2a81-48ba-0123-40743e35e671',
          user_id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          card_id: 'f3f50d2e-44e2-48c8-94e1-d665252ff701',
          failed_attempts: 0,
          successful_attempts: 0
        },
        {
          id: 'b06ccb4e-101a-4697-0123-bb5a6397cad3',
          user_id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          card_id: '38e03851-70c5-4a7b-831a-b06769423590',
          failed_attempts: 0,
          successful_attempts: 0
        },
        {
          id: 'be564cf1-5af9-411c-0123-c46fbfb654bb',
          user_id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          card_id: 'ae43d15c-0632-4d98-a0ab-1623185902b3',
          failed_attempts: 0,
          successful_attempts: 0
        },
        {
          id: 'b6f88276-b85a-4686-0123-fe88a5c2dae3',
          user_id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          card_id: 'c68859a1-9d36-40b8-8c7a-3e02813cd232',
          failed_attempts: 0,
          successful_attempts: 0
        },
        {
          id: '181adf35-5a8e-4889-0123-bf422dff2914',
          user_id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
          card_id: '65ac18fe-c7cf-4828-93ce-768cdc25ad8e',
          failed_attempts: 0,
          successful_attempts: 0
        },
        ...jsonContent.cardCollection
      ]);
    });
};
