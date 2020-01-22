const userDependencyDatabaseInjection = db => {
  // should return user info
  // should return no user if not found
  // should return error 500 if something unexpected happened
  const findUser = ({ username }) => {
    return db("user")
      .where({ username })
      .first("id", "username", "email", "password");
  };

  const createUser = ({ username, password }) => {
    return db("user")
      .insert({ username, password })
      .findUser({ username });
  };

  const userData = user_id => {
    return db
      .from("deck_collection")
      .where("user.id", user_id)
      .innerJoin("deck", "deck_collection.deck_id", "deck.id")
      .innerJoin(
        "user_card_collection",
        "deck_collection.card_id",
        "user_card_collection.id"
      )
      .innerJoin("card", "user_card_collection.card_id", "card.id")
      .innerJoin("user", "deck.user_id", "user.id")
      .select(
        "user.id as id",
        "user.username",
        "card.id as card_id",
        "deck.id as deck_id",
        "user_card_collection.id as user_card_id",
        "card.foreign_word as foreign_word",
        "card.grammer_type as grammer_type",
        "card.translation as translation",
        "card.definition as definition",
        "card.image as image",
        "card.audio as audio",
        "card.animation as animation",
        "user_card_collection.failed_attempts as failed_attempts",
        "user_card_collection.successful_attempts as successful_attempts",
        "user_card_collection.review_date as review_date"
      )
      .then(data => {
        const memo = {};
        const decks = data
          .filter(card => {
            if (!memo[card.deck_id]) {
              memo[card.deck_id] = card.deck_id;
              return true;
            }
            return false;
          })
          .map(card => ({ deck_id: card.deck_id }));

        const results = {
          user_id,
          username: data[0].username,
          total_decks: decks.length,
          total_cards: data.length,
          deck_list: [
            ...decks.map(deck => {
              return {
                deck_id: deck.deck_id,
                deck_title: "Temporary",
                description: "Temporary description of deck",
                category: "Language",
                collection: data
                  .filter(card => deck.deck_id === card.deck_id)
                  .map(card => {
                    return {
                      // user_card_id: card.id,
                      // card_id: card.card_id,
                      card_id: card.id,
                      grammer_type: card.grammer_type,
                      foreign_word: card.foreign_word,
                      translation: card.translation,
                      definition: card.definition,
                      image: card.image,
                      audio: card.audio,
                      animation: card.animation,
                      failed_attempts: card.failed_attempts,
                      successful_attempts: card.successful_attempts,
                      review_date: card.review_date
                    };
                  })
              };
            })
          ]
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
