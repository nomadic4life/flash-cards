const userDependencyDatabaseInjection = db => {
  const all = () => {
    // return db("user")
    //   .limit(15)
    //   .offset(15);
    return db
      .from("deck_collection")
      .select(
        "deck.id as deck_id",
        "user_card_collection.id as user_card_id",
        "user_card_collection.card_id as card_id",
        "deck.user_id as deckUserId",
        "user_card_collection.user_id as cardUserId",
        "card.foreign_word",
        "card.translation",
        "card.definition",
        "card.image",
        "card.audio",
        "card.animation",
        "card_count",
        "failed_attempts",
        "successful_attempts",
        "review_date"
      )
      .innerJoin("deck", "deck.id", "deck_collection.deck_id")
      .innerJoin(
        "user_card_collection",
        "deck_collection.card_id",
        "user_card_collection.id"
      )
      .innerJoin("card", "user_card_collection.card_id", "card.id")
      .where(
        "user_card_collection.user_id",
        "e091bdcd-2c08-4e5e-852c-289b75ba6f18"
      )
      .limit(15);
    //   .select("deck.id", "user_id", "username", "user.created_at as created");
    // .leftJoin("user");
  };

  return {
    all
  };
};

module.exports = userDependencyDatabaseInjection;

// {
//     "deck_id": "eda190cd-e5c0-4f27-bc19-980cd8ebcb6d",
//     "card_id": "54b5c4e8-437f-429e-9875-28f2f6553a1f"
// },

// {
//     "deck_id": "eda190cd-e5c0-4f27-bc19-980cd8ebcb6d",
//     "card_id": "54b5c4e8-437f-429e-9875-28f2f6553a1f",
//     "id": "eda190cd-e5c0-4f27-bc19-980cd8ebcb6d",
//     "user_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
//     "card_count": 0,
//     "created_at": "2020-01-11T10:38:28.709Z",
//     "updated_at": "2020-01-11T10:38:28.709Z"
// },

// {
//     "deck_id": "eda190cd-e5c0-4f27-bc19-980cd8ebcb6d",
//     "card_id": "c8470e3f-ce08-49e5-a358-6a503b0d4ac1",
//     "id": "54b5c4e8-437f-429e-9875-28f2f6553a1f",
//     "user_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
//     "card_count": 0,
//     "created_at": "2020-01-11T10:38:28.709Z",
//     "updated_at": "2020-01-11T10:38:28.709Z",
//     "failed_attempts": 0,
//     "successful_attempts": 0,
//     "review_date": "2020-01-11T10:38:28.767Z"
// },

// {
//     "deckId": "eda190cd-e5c0-4f27-bc19-980cd8ebcb6d",
//     "cardId": "54b5c4e8-437f-429e-9875-28f2f6553a1f",
//     "card_Id": "c8470e3f-ce08-49e5-a358-6a503b0d4ac1",
//     "deckUserId": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
//     "cardUserId": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
//     "card_count": 0,
//     "failed_attempts": 0,
//     "successful_attempts": 0,
//     "review_date": "2020-01-11T10:38:28.767Z"
// },
