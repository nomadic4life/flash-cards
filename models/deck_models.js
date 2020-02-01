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

  const getDeck = id => {
    return db
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

  const createDeck = ({ user_id, deck_title, thumbnail, description, category, tags }) => {

    const id = uuid();
    const datestamp = Data.now();
    const additional_info = JSON.stringify({
      deck_title,
      thumbnail,
      description,
      created_at: datestamp,
      updated_at: datestamp
    })

    return db
      .from('deck')
      .insert({
        id,
        user_id,
        category,
        additional_info
      }, [
        'id as deck_id',
        'user_id',
        'category',
        'additional_info'
      ])
      .then(data => {
        const [deck] = data;
        const deck_tags = { [deck.deck_id]: tags || [] };
        const result = deckInfo(data, [], deck_tags);
        // .dateTimeInfo();
        return result
      })
  }

  return {
    getDeck,
    listDecks,
    createDeck
  };
};

module.exports = userDependencyDatabaseInjection;
