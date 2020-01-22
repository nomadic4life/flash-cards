exports.up = function (knex) {
  return knex.schema
    .createTable('card_tags', tbl => {

      tbl
        .uuid('card_id')
        .references('id')
        .inTable('card')
        .notNullable();

      tbl
        .string('tag')
        .references('appellation')
        .inTable('tag')
        .notNullable();

      tbl
        .unique(['card_id', 'tag']);

    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('card_tags');
};