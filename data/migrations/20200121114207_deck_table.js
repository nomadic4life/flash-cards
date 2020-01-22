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

      // tbl
      //   .string('deck_title', 128)
      //   .notNullable();

      // tbl
      //   .string('thumbnail', 512)
      //   .nullable();

      // tbl
      //   .text('description')
      //   .nullable();

      // tbl
      //   .timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('deck')
};
