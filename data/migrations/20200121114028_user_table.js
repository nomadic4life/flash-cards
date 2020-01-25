exports.up = function (knex) {
  return knex.schema.createTable('user', tbl => {

    tbl
      .uuid('id')
      .primary()
      .unique()
      .notNullable();

    tbl
      .string('avatar', 128)
      .nullable();

    tbl
      .string('email', 256)
      .unique()
      .notNullable();

    tbl
      .string('username', 128)
      .unique()
      .notNullable();

    tbl
      .string('password')
      .notNullable();

    tbl
      .timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('user');
};
