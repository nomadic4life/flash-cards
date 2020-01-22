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
      .innerJoin('category',
        'category.appellation',
        'deck.category')
      .innerJoin('deck_tags',
        'deck_tags.deck_id',
        'deck.id')
      .innerJoin('card_tags',
        'card_tags.card_id',
        'user_card.id')
      .select(
        'user.id as user_id',
        'user.username',
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

        const filterData = () => {
          const memo = {},
            deckTags = {},
            cardTags = {},
            decks = [],
            cards = [];

          const addResource = (id, card, resource, memo) => {
            if (!memo[id]) {
              memo[id] = card;
              resource.push(id);
            }
          }

          const addDeck = (deck_id, card, decks, memo) => {
            addResource(deck_id, card, decks, memo);
          }

          const addCard = (card_id, deck_id, card, cards, memo) => {
            const userCard = card_id + '--' + deck_id;
            addResource(userCard, card, cards, memo);
          }

          const addTags = (idType, tagType, tagCollection, card) => {

            const id = card[idType];
            const tag = card[tagType];

            if (tagCollection[id] === undefined) {

              return tagCollection[id] = new Set();
            }

            tagCollection[id].add(tag);
          }

          for (let i = 0; i < data.length; i++) {
            const card = data[i];
            const deck_id = card.deck_id;
            const card_id = card.card_id;

            addDeck(deck_id, card, decks, memo);

            addCard(card_id, deck_id, card, cards, memo);

            addTags("deck_id", "deck_tags", deckTags, card);

            addTags("card_id", "card_tags", cardTags, card);

            // if (deckTags[card.deck_id] === undefined) {
            //   deckTags[card.deck_id] = new Set();
            // } else {
            //   deckTags[card.deck_id].add(card.deck_tags);
            // }

            // if (cardTags[card.card_id] === undefined) {
            //   cardTags[card.card_id] = new Set();
            // } else {
            //   cardTags[card.card_id].add(card.card_tags);
            // }
          }

          return { decks, cards, memo, deckTags, cardTags };
        }

        const { decks, cards, memo, deckTags, cardTags } = filterData();

        const mapCard = deck_id => {

          return cards
            .filter(card => deck_id === memo[card].deck_id)
            .map(id => {

              const card = memo[id];

              return {
                // card information
                card_id: card.user_card_card,
                foreign_language: card.foreign_language,
                native_language: card.native_language,
                parts_of_speech: card.parts_of_speech,
                foreign_word: card.foreign_word,
                translation: card.translation,
                definition: card.definition,
                illustrations: card.file_assets.visuals,
                audio: card.file_assets.audio,
                failed_attempts: card.failed_attempts,
                successful_attempts: card.successful_attempts,
                rating: card.rating,
                review_session: card.review_session,
                append: card.append,
                additional_info: {
                  meta_data: card.additional_info.meta_data,
                  tags: [...cardTags[card.card_id]],
                  notes: card.append
                }
              };

            })
        }

        const mapDeck = () => {

          return decks.map(id => {

            const deck = memo[id];
            const collection = mapCard(id)

            return {
              // deck information
              deck_id: id,
              deck_title: deck.deck_info.deck_title,
              thumbnail: deck.deck_info.thumbnail,
              description: deck.deck_info.description,
              category: deck.category,
              tags: [...deckTags[id]],
              deck_cards_total: collection.length,
              collection
            }
          })
        }

        const deckList = mapDeck();

        const results = {
          // user information
          user_id,
          username: data[0].username,
          total_decks: decks.length,
          total_cards: cards.length,
          deck_list: deckList
        };

        return results;

      });
  };

  return {
    findUser,
    createUser,
    userData
  };
};

module.exports = userDependencyDatabaseInjection;
