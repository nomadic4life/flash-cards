const userDependencyDatabaseInjection = db => {
  const listDecks = async ({ page = 0, perPage = 15 }) => {
    const decks = await db("deck")
      .join("user", "user.id", "deck.user_id")
      .select(
        "deck.id as deck_id",
        "user.id as user_id",
        "user.username as username"
      )
      .limit(perPage)
      .offset(page * perPage);

    const list = await decks.map(deck => {
      return deck.deck_id;
    });

    return await db("deck_collection")
      .whereIn("deck_id", list)
      .join(
        "user_card_collection",
        "deck_collection.card_id",
        "user_card_collection.id"
      )
      .join("card", "user_card_collection.card_id", "card.id")
      .then(data => {
        return decks.map(deck => {
          const deck_card_list = data
            .filter(card => deck.deck_id === card.deck_id)
            .map(card => {
              return {
                card_id: card.card_id,
                category: "Langauge",
                foreign_word: card.foreign_word,
                translation: card.translation,
                definition: card.definition,
                image: card.image,
                audio: card.audio,
                animation: card.animation
              };
            });

          return {
            deck_id: deck.deck_id,
            user_id: deck.user_id,
            username: deck.username,
            deck_title: "forgot",
            description: "Basic Korean Words",
            deck_card_total: deck_card_list.length,
            deck_card_list
          };
        });
      });
  };

  return {
    listDecks
  };
};

module.exports = userDependencyDatabaseInjection;
