const fs = require("fs");
const faker = require("faker");
const uuid = require("uuid/v4");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const maxUsers = 500;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const generateForeignWord = () => {
  let str = "";
  for (let i = 0; i < getRandomInt(7); i++) {
    const syllabol = String.fromCodePoint(
      (getRandomInt(55203 - 44032) + 44032).toString()
    );
    str = str + syllabol;
  }

  return str;
};

const generateUsers = async () => {
  const users = [];
  const usernames = {};

  const generateUsername = () => {
    const username = faker.internet.userName().toLowerCase();
    if (!usernames[username]) {
      usernames[username] = true;
      return { username };
    }

    console.log("duplicate username", username);
    return generateUsername();
  };

  for (let i = 0; i < maxUsers; i++) {
    const id = uuid();
    const { username } = generateUsername();

    const password = await bcrypt.hashSync(
      faker.internet.password(),
      saltRounds
    );

    users[i] = {
      id,
      username,
      password
    };
  }

  return users;
};

const generateCards = async users => {
  const cards = [];
  const seed = users.length;
  const grammer = ["noun", "verb", "adjective"];
  for (let i = 0; i < users.length * 6; i++) {
    const id = uuid();
    const grammer_type = grammer[getRandomInt(3)];
    const foreign_word = await generateForeignWord();
    const translation = await faker.lorem.word();
    const definition = await faker.lorem.text();
    const image = null;
    const audio = null;
    const animation = null;
    const index = await getRandomInt(seed);
    const user_id = users[index].id;

    cards[i] = {
      id,
      grammer_type,
      foreign_word,
      translation,
      definition,
      image,
      audio,
      animation,
      user_id
    };
  }

  return cards;
};

const generateDecks = async users => {
  const deck = [];
  const seed = users.length;
  for (let i = 0; i < users.length * 2.5; i++) {
    const id = uuid();
    const index = getRandomInt(seed);
    const user_id = users[index].id;

    deck[i] = {
      id,
      user_id
    };
  }

  return deck;
};

const generateCardCollection = (users, cards) => {
  const cardCollection = [];
  const cardRecord = {};
  const uSeed = users.length;
  const cSeed = cards.length;
  const failed_attempts = 0;
  const successful_attempts = 0;

  const initializeDefault = () => {
    for (let i = 0; i < users.length; i++) {
      const user_id = users[i].id;
      cardRecord[user_id] = {};
      for (let j = 0; j < cards.length; j++) {
        if (user_id === cards[j].user_id) {
          const card_id = cards[j].id;
          cardRecord[user_id][card_id] = card_id;
        }
      }
    }

    users.forEach(user => {
      const user_id = user.id;
      Object.values(cardRecord[user_id]).forEach(card => {
        const size = Object.keys(cardCollection).length;
        const id = uuid();
        const card_id = card;

        cardRecord[user_id][card_id] = {
          id,
          user_id
        };

        cardCollection[size] = {
          id,
          user_id,
          card_id,
          failed_attempts,
          successful_attempts
        };
      });
    });
  };

  const helper = () => {
    const uIndex = getRandomInt(uSeed);
    const cIndex = getRandomInt(cSeed);
    const user_id = users[uIndex].id;
    const card_id = cards[cIndex].id;

    if (!cardRecord[user_id]) {
      cardRecord[user_id] = {};
    }

    if (!cardRecord[user_id][card_id]) {
      cardRecord[user_id][card_id] = true;
    } else if (cardRecord[user_id][card_id]) {
      return helper();
    }
    return { user_id, card_id };
  };

  initializeDefault();

  for (let i = cardCollection.length; i < users.length * 10; i++) {
    const id = uuid();
    const { user_id, card_id } = helper();
    // const review_date = new Date()
    cardRecord[user_id][card_id] = {
      id,
      user_id
    };

    cardCollection[i] = {
      id,
      user_id,
      card_id,
      failed_attempts,
      successful_attempts
    };
  }

  return {
    cardCollection,
    userCardCollection: cardRecord
  };
};

const generateDeckCollection = (deck, userCardCollection) => {
  const deckCollection = [];

  for (let i = 0; i < deck.length; i++) {
    // deckCollection[i] = [];

    const collection = Object.values(userCardCollection[deck[i].user_id]);

    const collectionSize = collection.length;

    const range = getRandomInt(collectionSize);

    const pos = range >= collectionSize / 2 ? "start" : "end";

    const start = pos === "start" ? 0 : range;

    const end = pos === "end" ? collectionSize - 1 : range;

    for (let j = start; j < end; j++) {
      deckCollection.push({
        deck_id: deck[i].id,
        card_id: collection[j].id
        // user_id: deck[i].user_id
      });
    }
  }

  return deckCollection;
};

const generateData = async () => {
  const users = await generateUsers();
  //   console.log("\nusers:  ", users[0]);

  const cards = await generateCards(users);
  //   console.log("\ncards:  ", cards[0]);

  const decks = await generateDecks(users);
  //   console.log("\ndecks:  ", decks[0]);

  const { cardCollection, userCardCollection } = await generateCardCollection(
    users,
    cards
  );

  //   console.log("\ncardCollection", cardCollection.length);

  const deckCollection = await generateDeckCollection(
    decks,
    userCardCollection
  );
  //   console.log("\ndeck Collection", deckCollection[0]);

  //   console.log({ users, cards, decks, cardCollection, deckCollection });
  //   console.log(
  //     users.length,
  //     cards.length,
  //     decks.length,
  //     cardCollection.length,
  //     deckCollection.length
  //   );

  const data = {
    users,
    cards,
    decks,
    cardCollection,
    deckCollection
  };

  const jsonData = await JSON.stringify(data);
  console.log(jsonData[0]);
  fs.writeFile("./data/generatedData/data.json", jsonData, err => {
    if (err) {
      console.log(err);
      return err;
    }

    console.log("JSON file has been saved.");
  });
};

generateData();
