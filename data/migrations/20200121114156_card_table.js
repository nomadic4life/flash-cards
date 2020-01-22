exports.up = function (knex) {
  return knex.schema
    .createTable('card', tbl => {

      tbl
        .uuid('id')
        .primary()
        .unique()
        .notNullable();

      tbl
        .enu('parts_of_speech', [
          'noun',
          'pronoun',
          'determiner',
          'verb',
          'adverb',
          'adjective',
          'particle',
          'interjection',
          'numeral'
        ])
        .notNullable();

      tbl
        .string('foreign_language')
        .references('appellation')
        .inTable('language')
        .notNullable();

      tbl
        .string('native_language')
        .references('appellation')
        .inTable('language')
        .notNullable();


      tbl
        .string('foreign_word', 512)
        .notNullable();

      tbl
        .text('translation')
        .notNullable();

      tbl
        .text('definition')
        .nullable();

      tbl
        .json('file_assets')
        .nullable();

      tbl
        .json('additional_info')
        .nullable();

      // tbl
      //   .string('foreign_language', 64)
      //   .notNullable()
      //   .defaultTo('Korean');

      // tbl
      //   .string('native_language', 64)
      //   .notNullable()
      //   .defaultTo('English');


      // tbl
      //   .string('image', 512)
      //   .nullable();

      // tbl
      //   .string('audio', 512)
      //   .nullable();

      // tbl
      //   .string('animation', 512)
      //   .nullable();

      // tbl
      //   .json('notes')
      //   .nullable();

      // tbl
      //   .timestamps(true, true);
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('card');
};
