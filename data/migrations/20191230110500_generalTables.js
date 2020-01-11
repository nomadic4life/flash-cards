exports.up = function(knex) {
  return knex.schema
    .createTable("user", tbl => {
      tbl
        .uuid("id")
        .primary()
        .unique()
        .notNullable();
      tbl
        .string("username", 128)
        .unique()
        .notNullable();
      tbl.string("password").notNullable();
      tbl.timestamps(true, true);
    })
    .createTable("card", tbl => {
      tbl
        .uuid("id")
        .primary()
        .unique()
        .notNullable();
      tbl.enu("grammer_type", ["noun", "verb", "adjective"]).notNullable();
      tbl.string("foreign_word", 512).notNullable();
      tbl.text("translation").notNullable();
      tbl.text("definition").nullable();
      tbl.binary("image").nullable();
      tbl.binary("audio").nullable();
      tbl.binary("animation").nullable();
      tbl
        .uuid("user_id")
        .references("id")
        .inTable("user");
      tbl.timestamps(true, true);
    })
    .createTable("deck", tbl => {
      tbl
        .uuid("id")
        .primary()
        .unique()
        .notNullable();
      tbl
        .uuid("user_id")
        .references("id")
        .inTable("user");
      tbl
        .integer("card_count")
        .notNullable()
        .defaultTo(0);
      tbl.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("deck")
    .dropTableIfExists("card")
    .dropTableIfExists("user");
};
