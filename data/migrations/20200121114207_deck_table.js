exports.up = function (knex) {
  return knex.schema
    .createTable('deck', tbl => {

      tbl
        .uuid('id')
        .primary()
        .unique()
        .notNullable();

      tbl
        .uuid('user_id')
        .references('id')
        .inTable('user')
        .notNullable();

      tbl
        .string('category')
        .references('appellation')
        .inTable('category')
        .notNullable();

      tbl
        .json('additional_info')
        .nullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('deck')
};
