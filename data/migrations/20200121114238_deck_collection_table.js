exports.up = function (knex) {
  return knex.schema
    .createTable('deck_collection', tbl => {

      tbl
        .uuid('deck_id')
        .references('id')
        .inTable('deck')
        .notNullable();

      tbl
        .uuid('card_id')
        .references('id')
        .inTable('user_card')
        .notNullable();

      tbl
        .unique(['deck_id', 'card_id']);

    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('deck_collection');
};