users

- users have decks

decks

- are group or collect of cards grouped in various ways
- category
- classification
- topic
- subject
- group
- collection

cards

- are words to learn
- are placed in decks
- a card can be placed in more then one deck

decks of cards can have meta data

concept

- users study a deck of cards to learn new words or review words
- the system will implement spaced repitition to review deck of cards

Routes

// get/read
'/' root route - sanity check, to test if api is online

'/api/login' - user login

'/api/signup/ - user signup

'/api/list-all/?users=all&pages=0' list all users - display all users on database, can be paginated with pages

'/api/list-all/?cards=all&pages=0' list all cards - display all cards on database, can be paginated with pages

'/api/list-all/?decks=all&pages=0' list all decks - display all decks on database, can be paginated with pages

'/api/user/?decks=all&pages=0' list all decks for a user - display all decks for user on database, can be paginated with pages

'/api/user/?cards=all&pages=0' - display all cards for user on database, can be paginated with pages

'/api/deck/?cards=all&pages=0' list all cards for a deck - display all cards for deck on database, can be paginated with pages

'/api/deck/?users=all&pages=0' list all users for a deck - display all users for deck on database, can be paginated with pages

'/api/card/?users=all&pages=0' list all users for card - display all users for cards on database, can be paginated with pages

'/api/card/?decks=all&pages=0' list all decks for card - display all decks for cards on database, can be paginated with pages

'/api/add/?deck=uuid' - add card to a new deck or existing deck from table or create new card

'/api/delete/?card=id&deck=id' - delete card from specific deck or delete entire deck, card will be deleted from table if no deck holds card, deck will be deleted from table if no user holds deck

'/api/copy/?deck=id&card=id' - users can copy another users deck or users can copy a card from another deck

'/api/update/?card=uuid' ? - update card

// user can display what cards in a specific deck based on user or specific card
// user can add card to a deck from card table or adding a new card to card table
// user can update/edit card from deck, new card is created onto table
// user can get/read card from deck
// user can get deck
// user can update deck
// user can check every user that has a card in deck
// track user status
// track deck status
// track card status
// users have a status table

# **API Schema:**

### logged in user deck list

list of all cards grouped by deck collection

```json
{
  "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
  "username": "testuser",
  "total_decks": 1,
  "total_cards": 1,
  "user_decks": [
    {
      "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "deck_title": "forgot",
      "user_deck_cards_list": [
        {
          "user_card_id": "c091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "foreign_word": "여보세요",
          "translation": "hello",
          "definition": "greetings",
          "image": "null",
          "audio": "null",
          "animation": "null",
          "failed_attempts": 0,
          "successful_attempts": 0,
          "review_date": "datestring"
        }
      ]
    }
  ]
}
```

### logged in user card list

list of all cards, grouped by card collection

```json
{
  "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
  "username": "testuser",
  "total_decks": 1,
  "total_cards": 1,
  "deck_id_list": [{ "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18" }],
  "user_cards_list": [
    {
      "user_card_id": "c091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "deck_title": "forgot",
      "foreign_word": "여보세요",
      "translation": "hello",
      "definition": "greetings",
      "image": "null",
      "audio": "null",
      "animation": "null",
      "failed_attempts": 0,
      "successful_attempts": 0,
      "review_date": "datestring"
    }
  ]
}
```

### logged in user deck

```json
{
  "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
  "username": "testuser",
  "deck": {
    "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
    "deck_title": "forgot",
    "deck_total_cards": 1,
    "user_deck_cards_list": [
      {
        "user_card_id": "c091bdcd-2c08-4e5e-852c-289b75ba6f18",
        "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
        "foreign_word": "여보세요",
        "translation": "hello",
        "definition": "greetings",
        "image": "null",
        "audio": "null",
        "animation": "null",
        "failed_attempts": 0,
        "successful_attempts": 0,
        "review_date": "datestring"
      }
    ]
  }
}
```

### logged in user card

```json
{
  "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
  "username": "testuser",
  "card": {
    "user_card_id": "c091bdcd-2c08-4e5e-852c-289b75ba6f18",
    "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
    "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
    "deck_title": "forgot",
    "foreign_word": "여보세요",
    "translation": "hello",
    "definition": "greetings",
    "image": "null",
    "audio": "null",
    "animation": "null",
    "failed_attempts": 0,
    "successful_attempts": 0,
    "review_date": "datestring"
  }
}
```

### deck list / decks paginated results

```json
{
  "decks": [
    {
      "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "username": "testuser",
      "deck_title": "forgot",
      "deck_card_total": 1,
      "deck_card_list": [
        {
          "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "foreign_word": "여보세요",
          "translation": "hello",
          "definition": "greetings",
          "image": "null",
          "audio": "null",
          "animation": "null"
        }
      ]
    }
  ]
}
```

### card list / cards paginated results

```json
{
  "cards": [
    {
      "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "created_by": "username",
      "foreign_word": "여보세요",
      "translation": "hello",
      "definition": "greetings",
      "image": "null",
      "audio": "null",
      "animation": "null",
      "decks_total": 1,
      "listed_card_decks": [
        {
          "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "username": "testuser",
          "deck_title": "forgot"
        }
      ]
    }
  ]
}
```

### user card list

list of all cards of a user, grouped by card list

```json
{
  "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
  "username": "testuser",
  "deck_list": [{ "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18" }],
  "total_cards": 1,
  "total_decks": 1,
  "user_card_list": [
    {
      "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "deck_title": "forgot",
      "foreign_word": "여보세요",
      "translation": "hello",
      "definition": "greetings",
      "image": "null",
      "audio": "null",
      "animation": "null"
    }
  ]
}
```

### user deck list

list of all decks of a user, grouped by deck list

```json
{
  "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
  "username": "testuser",
  "total_cards": 1,
  "total_decks": 1,
  "deck_list": [
    {
      "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "deck_title": "forgot",
      "deck_cards_total": 1,
      "deck_card_list": [
        {
          "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "created_by": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "foreign_word": "여보세요",
          "translation": "hello",
          "definition": "greetings",
          "image": "null",
          "audio": "null",
          "animation": "null"
        }
      ]
    }
  ]
}
```

### user list / users paginated results

list of paginated users,
with all cards grouped by card collection

```json
{
  "users": [
    {
      "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "username": "testuser",
      "total_decks": 0,
      "total_cards": 0,
      "deck_list": [{ "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18" }],
      "card_list": [
        {
          "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "deck_title": "forgot",
          "foreign_word": "여보세요",
          "translation": "hello",
          "definition": "greetings",
          "image": "null",
          "audio": "null",
          "animation": "null"
        }
      ]
    }
  ]
}
```

### user list / users paginated results

list of paginated users,
with all cards grouped by decks

```json
{
  "users": [
    {
      "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "username": "testuser",
      "total_decks": 1,
      "total_cards": 1,
      "deck_list": [
        {
          "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "deck_title": "forgot",
          "deck_cards_total": 1,
          "deck_card_list": [
            {
              "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
              "created_by": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
              "foreign_word": "여보세요",
              "translation": "hello",
              "definition": "greetings",
              "image": "null",
              "audio": "null",
              "animation": "null"
            }
          ]
        }
      ]
    }
  ]
}
```

### user list / users paginated results

list of paginated users,
no cards and decks

```json
{
  "users": [
    {
      "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "username": "testuser"
    }
  ]
}
```
