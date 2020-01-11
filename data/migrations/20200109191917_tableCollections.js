exports.up = function(knex) {
  return knex.schema
    .createTable("user_card_collection", tbl => {
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
        .uuid("card_id")
        .references("id")
        .inTable("card");
      tbl
        .integer("failed_attempts")
        .notNullable()
        .defaultTo(0);
      tbl
        .integer("successful_attempts")
        .notNullable()
        .defaultTo(0);
      tbl
        .timestamp("review_date")
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable("deck_collection", tbl => {
      tbl
        .uuid("deck_id")
        .references("id")
        .inTable("deck");
      tbl
        .uuid("card_id")
        .references("id")
        .inTable("user_card_collection");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("deck_collection")
    .dropTableIfExists("user_card_collection");
};
