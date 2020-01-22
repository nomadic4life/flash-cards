const fs = require('fs');
const faker = require('faker');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const maxUsers = 5;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const generateForeignWord = () => {
  let str = '';
  for (let i = 0; i < getRandomInt(7) + 1; i++) {
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

    console.log('duplicate username', username);
    return generateUsername();
  };

  for (let i = 0; i < maxUsers; i++) {
    const id = uuid();
    const avatar = faker.internet.avatar();
    const { username } = generateUsername();
    const email = faker.internet.email();

    const password = await bcrypt.hashSync(
      faker.internet.password(),
      saltRounds
    );

    users[i] = {
      id,
      avatar,
      username,
      email,
      password
    };
  }

  return users;
};

const generateCards = async (users, language) => {
  const cards = [];
  const seed = users.length;
  const partsOfSpeech = [
    'noun',
    'pronoun',
    'determiner',
    'verb',
    'adverb',
    'adjective',
    'particle',
    'interjection',
    'numeral'
  ];

  for (let i = 0; i < users.length * 6; i++) {
    const id = uuid();
    const parts_of_speech = partsOfSpeech[getRandomInt(partsOfSpeech.length)];
    const foreign_word = await generateForeignWord();
    const translation = await faker.lorem.word();
    const definition = await faker.lorem.text();
    const index = await getRandomInt(seed);
    const username = users[index].username;
    const visuals = [faker.system.fileName() + '.png'];
    const audio = [faker.system.fileName() + '.mp4'];
    const file_assets = { visuals, audio };
    const additional_info = {
      meta_data: {
        created_by: username,
        created_at: Date.now()
      }
    };

    cards[i] = {
      id,
      foreign_language: language[0].appellation,
      native_language: language[1].appellation,
      parts_of_speech,
      foreign_word,
      translation,
      definition,
      file_assets,
      additional_info
    };
  }

  return cards;
};

const generateDecks = async (users, category) => {

  const deck = [];

  const seed = users.length;

  for (let i = 0; i < users.length * 2.5; i++) {

    const id = uuid();

    const index = getRandomInt(seed);

    const user_id = users[index].id;

    const additional_info = {
      deck_title: faker.lorem.word(),
      thumbnail: faker.image.imageUrl(),
      description: faker.lorem.text(),
      created_at: Date.now(),
      updated_at: Date.now()
    }

    deck[i] = {
      id,
      user_id,
      category: category[getRandomInt(category.length)].appellation,
      additional_info: JSON.stringify(additional_info)
    };
  }

  return deck;
};

const generateDeckTags = (decks, tags) => {
  const deck_tags = [];
  const memo = {}

  const shuffle = () => {

    const deck = decks[getRandomInt(decks.length)].id
    const tag = tags[getRandomInt(tags.length)].appellation;

    if (memo[deck + tag]) {
      return shuffle()
    }

    memo[deck + tag] = true
    return { deck, tag }
  }

  for (let i = 0; i < decks.length * 3; i++) {
    const { deck: deck_id, tag } = shuffle()

    deck_tags[i] = {
      deck_id,
      tag
    }
  };

  return deck_tags;
}

const generateUserCards = (users, cards) => {
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

const generateCardTags = (cards, tags) => {
  const card_tags = []
  const memo = {}

  const shuffle = () => {

    const card = cards[getRandomInt(cards.length)].id;
    const tag = tags[getRandomInt(tags.length)].appellation;

    if (memo[card + tag]) {
      return shuffle()
    }

    memo[card + tag] = true
    return { card, tag }
  }

  for (let i = 0; i < cards.length * 3; i++) {
    const { card: card_id, tag } = shuffle()

    card_tags[i] = {
      card_id,
      tag
    }
  }

  return card_tags
}

const generateDeckCollection = (deck, userCardCollection) => {
  const deckCollection = [];

  for (let i = 0; i < deck.length; i++) {

    const collection = Object.values(userCardCollection[deck[i].user_id]);

    const collectionSize = collection.length;

    const range = getRandomInt(collectionSize);

    const pos = range >= collectionSize / 2 ? 'start' : 'end';

    const start = pos === 'start' ? 0 : range;

    const end = pos === 'end' ? collectionSize - 1 : range;

    for (let j = start; j < end; j++) {
      deckCollection.push({
        deck_id: deck[i].id,
        card_id: collection[j].id
      });
    }
  }

  return deckCollection;
};

const generateData = async () => {
  const users = await generateUsers();
  // console.log('\nusers:  ', users);

  const language = [
    { appellation: 'Korean' },
    { appellation: 'English' }
  ]

  const category = [
    { appellation: 'family' },
    { appellation: 'numbers' },
    { appellation: 'food' },
    { appellation: 'color' },
    { appellation: 'activites' }
  ]

  const tag = [
    { appellation: 'travel' },
    { appellation: 'color' },
    { appellation: 'ideas' },
    { appellation: 'communication' },
    { appellation: 'space' },
    { appellation: 'funny' },
    { appellation: 'fun' },
    { appellation: 'distance' },
    { appellation: 'food' },
    { appellation: 'family' },
    { appellation: 'activities' },
    { appellation: 'games' },
    { appellation: 'sports' },
    { appellation: 'peronal' },
  ]

  const cards = await generateCards(users, language);
  // console.log('\ncards:  ', cards);


  const decks = await generateDecks(users, category);
  // console.log('\ndecks:  ', decks);

  const deck_tags = await generateDeckTags(decks, tag);

  const { cardCollection,
    userCardCollection } = await generateUserCards(users, cards);

  const card_tags = await generateCardTags(cards, tag);

  // console.log('\ncardCollection', cardCollection.length);

  const deckCollection = await generateDeckCollection(decks, userCardCollection);
  // console.log('\ndeck Collection', deckCollection);

  // console.log({ users, cards, decks, cardCollection, deckCollection });
  // console.log(
  //   users.length,
  //   cards.length,
  //   decks.length,
  //   cardCollection.length,
  //   deckCollection.length
  // );

  const data = {
    users,
    language,
    category,
    tag,
    cards,
    decks,
    deck_tags,
    cardCollection,
    card_tags,
    deckCollection
  };

  const jsonData = await JSON.stringify(data);
  console.log(jsonData[0]);
  fs.writeFile('./data/generatedData/data.json', jsonData, err => {
    if (err) {
      console.log(err);
      return err;
    }

    console.log('JSON file has been saved.');
  });
};

generateData();
