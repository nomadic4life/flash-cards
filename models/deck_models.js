const { processData, deckInfo, mapCard } = require('../utils/model_helpers');
const uuid = require('uuid/v4');

const userDependencyDatabaseInjection = db => {
  const listDecks = ({ user_id, page = 0, perPage = 15 }) => {

    return db
      .from('deck_collection')
      .whereIn('deck_collection.deck_id', function () {
        this.select('deck.id as deck_id')
          .from('deck')
          .limit(perPage)
          .offset(page * perPage)
      })
      .innerJoin('deck',
        'deck_collection.deck_id',
        'deck.id')
      .innerJoin('user_card',
        'deck_collection.card_id',
        'user_card.id')
      .innerJoin('card',
        'user_card.card_id',
        'card.id')
      .innerJoin('user',
        'user.id',
        'deck.user_id')
      // .innerJoin('category',
      //   'category.appellation',
      //   'deck.category')
      .fullOuterJoin('deck_tags',
        'deck_tags.deck_id',
        'deck.id')
      .fullOuterJoin('card_tags',
        'card_tags.card_id',
        'user_card.id')
      .select(
        'user.id as user_id',
        'user.username',
        'user.avatar',
        'card.id as card_id',
        'deck.id as deck_id',
        'deck.additional_info as deck_info',
        'deck.category as category',
        'deck_tags.tag as deck_tags',
        'card_tags.tag as card_tags',
        'user_card.id as user_card_id',
        'card.foreign_language as foreign_language',
        'card.native_language as native_lanuage',
        'card.parts_of_speech as parts_of_speech',
        'card.foreign_word as foreign_word',
        'card.translation as translation',
        'card.definition as definition',
        'user_card.failed_attempts as failed_attempts',
        'user_card.successful_attempts as successful_attempts',
        'user_card.rating as rating',
        'user_card.review_session as review_session',
        'card.file_assets as file_assets',
        'card.additional_info as additional_info',
        'user_card.append as append')
      .then(data => {

        const {
          decks,
          cards,
          memo,
          deckTags,
          cardTags
        } = processData(data)
          .addDeck()
          .addCard()
          .addDeckTag()
          .addCardTag()
          .run();

        return {
          decks: decks.map(id => {
            const deck = memo[id];
            const collection = mapCard(user_id, memo, id, cards, cardTags);

            return deckInfo(deck, collection, deckTags)
              .userInfo()
              .dateTimeInfo()
              .results();
          })
        };
      });
  };

  const findTags = (tags) => {
    const executeDB = {
      trx(trx) {
        return executeDB.result(trx)
      },
      result(trx = db) {
        return trx
          .from('tag')
          .whereIn('appellation', tags)
      }
    };
    return executeDB;
  };

  const insertTags = (tags, tagList) => {
    const executeDB = {
      trx(trx) {
        return executeDB.result(trx)
      },
      result(trx = db) {
        tagList = new Set(tagList.map(tag => tag.appellation));
        tag = tags.filter(tag => tagList.has(tag) === false)
          .map(tag => ({ appellation: tag }));
        return trx.insert(tag).into('tag');
      }
    };
    return executeDB;
  };

  const getDeck = (id) => {
    const executeDB = {
      trx(trx) {
        return executeDB.result(trx)
      },
      result(trx = db) {
        return trx
          .from('deck')
          .where('deck.id', id)
          .leftJoin('deck_collection',
            'deck_collection.deck_id',
            'deck.id')
          .leftJoin('user_card',
            'deck_collection.card_id',
            'user_card.id')
          .leftJoin('card',
            'user_card.card_id',
            'card.id')
          .innerJoin('user',
            'deck.user_id',
            'user.id')
          .innerJoin('category',
            'category.appellation',
            'deck.category')
          .fullOuterJoin('deck_tags',
            'deck_tags.deck_id',
            'deck.id')
          .fullOuterJoin('card_tags',
            'card_tags.card_id',
            'user_card.id')
          .select(
            'user.id as user_id',
            'user.username',
            'user.avatar',
            'card.id as card_id',
            'deck.id as deck_id',
            'deck.additional_info as deck_info',
            'deck.category as category',
            'deck_tags.tag as deck_tags',
            'card_tags.tag as card_tags',
            'user_card.id as user_card_id',
            'card.foreign_language as foreign_language',
            'card.native_language as native_language',
            'card.parts_of_speech as parts_of_speech',
            'card.foreign_word as foreign_word',
            'card.translation as translation',
            'card.definition as definition',
            'user_card.failed_attempts as failed_attempts',
            'user_card.successful_attempts as successful_attempts',
            'user_card.rating as rating',
            'user_card.review_session as review_session',
            'card.file_assets as file_assets',
            'card.additional_info as additional_info',
            'user_card.append as append')
          .then(data => {

            const {
              decks,
              cards,
              memo,
              deckTags,
              cardTags
            } = processData(data)
              .addDeck()
              .addCard()
              .addDeckTag()
              .addCardTag()
              .run();

            const deckList = decks.map(id => {
              const deck = memo[id];
              const collection = mapCard(data[0], memo, id, cards, cardTags);

              return deckInfo(deck, collection, deckTags)
                .userInfo()
                .dateTimeInfo()
                .results();
            });

            const deck = {
              deck: deckList[0]
            }

            return deck;
          })
      }
    };
    return executeDB;
  };

  const insertCategory = (existingCategory = [], category) => {
    const executeDB = {
      trx(trx) {
        return executeDB.result(trx)
      },
      result(trx = db) {
        if (existingCategory.length === 1) return
        return trx.insert({ appellation: category }).into('category');
      }
    };
    return executeDB;
  };

  const readCategory = category => {
    const executeDB = {
      trx(trx) {
        return executeDB.result(trx)
      },
      result(trx = db) {
        return trx
          .from('category')
          .where('appellation', category)
      }
    };
    return executeDB;
  };

  const insertDeck = (deck) => {
    const executeDB = {
      trx(trx) {
        return executeDB.result(trx)
      },
      result(trx = db) {
        return trx
          .insert(deck)
          .into('deck');
      }
    };
    return executeDB;
  };

  const insertDeckTags = (deck_id, tags) => {
    const executeDB = {
      trx(trx) {
        return executeDB.result(trx)
      },
      result(trx = db) {
        tags = tags.map(tag => {
          return {
            deck_id,
            tag
          };
        });

        return trx
          .insert(tags).into('deck_tags');
      }
    };
    return executeDB;
  };

  const createDeck = ({ user_id, deck_title, thumbnail, description, category, tags }) => {

    const id = uuid();
    const datestamp = Date.now();
    const additional_info = JSON.stringify({
      deck_title,
      thumbnail, // need to implement full path.
      description,
      created_at: datestamp,
      updated_at: datestamp
    });

    // Using trx as a query builder:
    return db.transaction(trx => {

      return findTags(tags)
        .trx(trx)
        .then(tagList => {
          return insertTags(tags, tagList).trx(trx);
        })
        .then(() => {
          return readCategory(category).trx(trx)
        })
        .then(existingCategory => {
          return insertCategory(existingCategory, category).trx(trx);
        })
        .then(() => {
          return insertDeck({
            id,
            user_id,
            category,
            additional_info
          }).trx(trx);
        })
        .then(() => {
          return insertDeckTags(id, tags).trx(trx)
        })
        .then(() => {
          return getDeck(id).trx(trx);
        });
    });
  }

  return {
    getDeck,
    listDecks,
    createDeck
  };
};

module.exports = userDependencyDatabaseInjection;
