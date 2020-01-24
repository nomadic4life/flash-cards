const { processData, mapCard, deckInfo, userInfo } = require('../utils/model_helpers')

const userDependencyDatabaseInjection = db => {
  // should return user info
  // should return no user if not found
  // should return error 500 if something unexpected happened
  const findUser = ({ username }) => {
    return db('user')
      .where({ username })
      .first('id', 'username', 'email', 'password');
  };

  const createUser = ({ username, password }) => {
    return db('user')
      .insert({ username, password })
      .findUser({ username });
  };

  const userData = user_id => {
    return db
      .from('deck_collection')
      .where('user.id', user_id)
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
        'deck.user_id',
        'user.id')
      // .innerJoin('category',
      //   'category.appellation',
      //   'deck.category')
      .innerJoin('deck_tags',
        'deck_tags.deck_id',
        'deck.id')
      .innerJoin('card_tags',
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

        const deckList = decks.map(id => {
          const deck = memo[id];
          const collection = mapCard(memo, id, cards, cardTags);

          return deckInfo(deck, collection, deckTags)
            .dateTimeInfo()
            .results();
        });

        return userInfo(data[0], deckList, cards);
      });
  };

  return {
    findUser,
    createUser,
    userData
  };
};

module.exports = userDependencyDatabaseInjection;
