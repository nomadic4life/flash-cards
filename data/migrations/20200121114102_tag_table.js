exports.up = function (knex) {
  return knex.schema
    .createTable('tag', tbl => {
      tbl
        .string('appellation')
        .primary()
        .unique()
        .notNullable();
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('tag');
};
