exports.up = function (knex) {
  return knex.schema
    .createTable('user_card', tbl => {

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
        .uuid('card_id')
        .references('id')
        .inTable('card')
        .notNullable();

      tbl
        .integer('failed_attempts')
        .notNullable()
        .defaultTo(0);

      tbl
        .integer('successful_attempts')
        .notNullable()
        .defaultTo(0);

      tbl
        .enu('rating',
          [
            'new',
            'learning',
            'beginner',
            'moderate',
            'expert'
          ])
        .notNullable();

      tbl
        .json('review_session')
        .nullable();

      tbl
        .json('append')
        .nullable();

    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('user_card')
};

