const deckInfo = (deck, collection, deckTags) => {

  const userInfo = {};
  const dateTimeInfo = {};

  return {
    userInfo() {
      userInfo.user_id = deck.user_id; // 1
      userInfo.username = deck.username; // 2
      userInfo.avatar = deck.avatar; // 2
      return this
    },
    dateTimeInfo() {
      dateTimeInfo.created_at = deck.deck_info.created_at; // 3
      dateTimeInfo.updated_at = deck.deck_info.updated_at; // 4
      return this
    },
    results() {
      return {
        // deck information
        deck_id: deck.deck_id,
        ...userInfo,
        deck_title: deck.deck_info.deck_title,
        thumbnail: deck.deck_info.thumbnail,
        description: deck.deck_info.description,
        category: deck.category,
        ...dateTimeInfo,
        deck_card_total: collection.length,
        tags: deckTags[deck.deck_id] ? [...deckTags[deck.deck_id]] : [],
        collection: collection ? collection : []
      };
    }
  }
}

const cardInfo = (user_id, card, cardTags) => {

  const id = card.card_id;
  let user_card_info = {};
  let user_card_notes = {};

  if (user_id === card.user_id) {

    user_card_info = {
      failed_attempts: card.failed_attempts, // user_card
      successful_attempts: card.successful_attempts, // user_card
      rating: card.rating, // user_card
      review_session: card.review_session ? card.review_session : {}, // user_card
    };

    user_card_notes = {
      notes: card.append ? card.append : {}
    }; // user_card
  }

  return {
    // card information
    card_id: user_id === card.user_id ? card.user_card_id : card.card_id,
    parts_of_speech: card.parts_of_speech,
    foreign_language: card.foreign_language,
    native_language: card.native_language,
    foreign_word: card.foreign_word,
    translation: card.translation,
    definition: card.definition,
    illustrations: card.file_assets.visuals,
    audio: card.file_assets.audio,
    ...user_card_info,
    additional_info: {
      meta_data: card.additional_info.meta_data,
      tags: cardTags[id] ? [...cardTags[id]] : [],
      ...user_card_notes
    }
  };
}

const userInfo = (user, decks, cards) => {
  return {
    // user information
    user_id: user.user_id,
    username: user.username,
    avatar: user.avatar,
    total_decks: decks ? decks.length : undefined,
    total_cards: cards ? cards.length : undefined,
    deck_list: decks ? decks : undefined
  };
}

const processData = data => {
  const memo = {},
    deckTags = {},
    cardTags = {},
    decks = [],
    cards = [];

  const results = {
    decks,
    cards,
    deckTags,
    cardTags,
    memo
  }

  const operations = {
    addDeck() {
      this.setDeck = true;
      return this
    },
    addCard() {
      this.setCard = true;
      return this
    },
    addDeckTag() {
      this.setDeckTag = true;
      return this
    },
    addCardTag() {
      this.setCardTag = true;
      return this
    },
    run() {
      for (let i = 0; i < data.length; i++) {
        const card = data[i];
        const deck_id = card.deck_id;
        const card_id = card.card_id;

        if (this.setDeck)
          addDeck(deck_id, card, decks, memo);

        if (this.setCard)
          addCard(card_id, deck_id, card, cards, memo);

        if (this.setDeckTag)
          addTags("deck_id", "deck_tags", deckTags, card);

        if (this.setCardTag)
          addTags("card_id", "card_tags", cardTags, card);
      }

      return results;
    }
  }

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
    if (card_id === null) return
    const userCard = card_id + '--' + deck_id;
    addResource(userCard, card, cards, memo);
  }

  const addTags = (idType, tagType, tagCollection, card) => {

    const id = card[idType];
    const tag = card[tagType];

    if (tagCollection[id] === undefined) {

      tagCollection[id] = new Set();
    }

    tagCollection[id].add(tag);
  }

  return operations
}

const mapCard = (user_id, memo, deck_id, cards, cardTags) => {
  return cards
    .filter(card => deck_id === memo[card].deck_id)
    .map(id => {
      const card = memo[id];
      return cardInfo(user_id, card, cardTags);
    })
}

module.exports = {
  processData,
  deckInfo,
  cardInfo,
  userInfo,
  mapCard
}