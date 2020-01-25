exports.up = function(knex) {
  return knex.schema
    .createTable("user", tbl => {
      tbl
        .uuid("id")
        .primary()
        .unique()
        .notNullable();
      tbl.string("avatar", 512).nullable();
      tbl
        .string("email", 512)
        .unique()
        .notNullable();
      tbl
        .string("username", 128)
        .unique()
        .notNullable();
      tbl.string("password").notNullable();
      tbl.timestamps(true, true);
    })
    .createTable("category", tbl => {
      tbl
        .string("name", 128)
        .primary()
        .unique()
        .notNullable();
    })
    .createTable("tag", tbl => {
      tbl
        .string("name", 128)
        .primary()
        .unique()
        .notNullable();
    })
    .createTable("card", tbl => {
      tbl
        .uuid("id")
        .primary()
        .unique()
        .notNullable();
      tbl
        .enu("parts_of_speech", [
          "noun",
          "pronoun",
          "determiner",
          "verb",
          "adverb",
          "adjective",
          "particle",
          "interjection",
          "numeral"
        ])
        .notNullable();
      tbl
        .string("foreign_language", 64)
        .notNullable()
        .defaultTo("Korean");
      tbl
        .string("native_language", 64)
        .notNullable()
        .defaultTo("English");
      tbl.string("foreign_word", 512).notNullable();
      tbl.text("translation").notNullable();
      tbl.text("definition").nullable();
      tbl.string("image", 512).nullable();
      tbl.string("audio", 512).nullable();
      tbl.string("animation", 512).nullable();
      tbl.json("notes").nullable();
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
        .inTable("user")
        .notNullable();
      tbl.string("deck_title", 128).notNullable();
      tbl.string("thumbnail", 512).nullable();
      tbl
        .string("category")
        .references("name")
        .inTable("category")
        .notNullable();
      tbl.text("description").nullable();
      tbl.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("deck")
    .dropTableIfExists("card")
    .dropTableIfExists("tag")
    .dropTableIfExists("category")
    .dropTableIfExists("user");
};
