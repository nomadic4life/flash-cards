exports.up = function (knex) {
  return knex.schema
    .createTable('deck_tags', tbl => {

      tbl
        .uuid('deck_id')
        .references('id')
        .inTable('deck')
        .notNullable();

      tbl
        .string('tag')
        .references('appellation')
        .inTable('tag')
        .notNullable();

      tbl
        .unique(['deck_id', 'tag']);

    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('deck_tags');
};
