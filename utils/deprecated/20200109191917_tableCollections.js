exports.up = function(knex) {
  return knex.schema
    .createTable("user_card", tbl => {
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
      tbl
        .uuid("card_id")
        .references("id")
        .inTable("card")
        .notNullable();
      tbl
        .integer("failed_attempts")
        .notNullable()
        .defaultTo(0);
      tbl
        .integer("successful_attempts")
        .notNullable()
        .defaultTo(0);
      tbl
        .enu("rating", ["new", "learning", "beginner", "moderate", "expert"])
        .notNullable();
      tbl.json("notes").nullable();
      tbl
        .timestamp("foreign_word_review_date")
        .notNullable()
        .defaultTo(knex.fn.now());
      tbl
        .timestamp("native_word_review_date")
        .notNullable()
        .defaultTo(knex.fn.now());
      tbl
        .timestamp("visual_review_date")
        .notNullable()
        .defaultTo(knex.fn.now());
      tbl
        .timestamp("audio_review_date")
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable("deck_collection", tbl => {
      tbl
        .uuid("deck_id")
        .references("id")
        .inTable("deck")
        .notNullable();
      tbl
        .uuid("card_id")
        .references("id")
        .inTable("user_card_collection")
        .notNullable();

      // tbl.primary(["deck_id", "card_id"]);
      tbl.unique(["deck_id", "card_id"]);
    })
    .createTable("card_tags", tbl => {
      tbl
        .uuid("card_id")
        .references("id")
        .inTable("user_card")
        .notNullable();
      tbl
        .string("tag")
        .references("name")
        .inTable("tag")
        .notNullable();

      tbl.unique(["card_id", "tag"]);
    })
    .createTable("deck_tags", tbl => {
      tbl
        .uuid("deck_id")
        .references("id")
        .inTable("deck")
        .notNullable();
      tbl
        .string("tag")
        .references("name")
        .inTable("tag")
        .notNullable();

      tbl.unique(["deck_id", "tag"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("deck_collection")
    .dropTableIfExists("user_card_collection");
};
