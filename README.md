bugs
- there is a bug in our user models and maybe all models, need to implement error handler coming from models
- need to investigate this issue caused by foreign key constraint from deck catagory not existing from category table

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

## _Signed-in User data:_

| Method | Status | Endpoint           |
| :----: | -----: | :----------------- |
|  GET   |    200 | `/api/:user`       |
|  POST  |    200 | `/api/auth/login`  |
|  POST  |    201 | `/api/auth/signup` |

    list of all cards grouped by deck collection.
    # Response:

```json
{
  "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
  "username": "testuser",
  "avatar": "http://avatar.com",
  "total_decks": 1,
  "total_cards": 1,
  "deck_list": [
    {
      "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "deck_title": "Study Korean",
      "thumbnail": "http://someurl.com/image.png",
      "description": "Basic Korean words.",
      "category": "language",
      "deck_card_total": 1,
      "tags": [
        "food",
        "family",
      ],
      "collection": [
        {
          "card_id": "c091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "parts_of_speech": "verb",
          "foreign_language": "Korean",
          "native_language": "English",
          "foreign_word": "여보세요",
          "translation": "hello",
          "definition": "Ut ullam qui omnis qui.",
          "illustrations": [
            "http://someurl.com"
          ],
          "audio": [
            "http://someurl.com"
          ],
          "failed_attempts": 0,
          "successful_attempts": 0,
          "rating": "new",
          "review_session": {},
          "additional_info": {
            "meta_data": {
              "created_by": "kelvin_sauer",
              "created_at": 1579726461761
            },
            "tags": [
              "family",
              "fun",
              "ideas",
              "color"
            ],
            "notes": {}
          }
        }
      ]
    }
  ]
}
```

    list of all cards, grouped by user card collection.
    # Response:

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
      "description": "Basic Korean words.",
      "category": "language",
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

## _Signed-in User deck:_

| Method | Status | Endpoint                                                  |
| :----: | -----: | :-------------------------------------------------------- |
|  GET   |    200 | `/api/:user?deck_id=d091bdcd-2c08-4e5e-852c-289b75ba6f18` |

    # Response:

```json
{
  "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
  "username": "testuser",
  "deck": {
    "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
    "deck_title": "forgot",
    "description": "Basic Korean words.",
    "category": "language",
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

## _Signed-in User card:_

| Method | Status | Endpoint                                                       |
| :----: | -----: | :------------------------------------------------------------- |
|  GET   |    200 | `/api/:user?user_card_id=c091bdcd-2c08-4e5e-852c-289b75ba6f18` |

    # Response:

```json
{
  "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
  "username": "testuser",
  "card": {
    "user_card_id": "c091bdcd-2c08-4e5e-852c-289b75ba6f18",
    "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
    "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
    "deck_title": "forgot",
    "description": "Basic Korean words.",
    "category": "language",
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

## _Deck list / decks paginated results_

| Method | Status | Endpoint                       |
| :----: | -----: | :----------------------------- |
|  GET   |    200 | `/api/list-all?resource=decks` |

    # results list of decks are paginated.
    # logged in user deck
    # Response:

```json
{
  "decks": [
    {
      "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "username": "testuser",
      "avatar": "http://avatar.com",
      "deck_title": "Study Korean",
      "thumbnail": "http://someurl.com/image.png",
      "description": "Basic Korean words.",
      "category": "language",
      "created_at": 1579726461765,
      "updated_at": 1579726461765,
      "deck_card_total": 1,
      "tags": [],
      "collection": [
        {
          "card_id": "e091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "parts_of_speech": "verb",
          "foreign_language": "Korean",
          "native_language": "English",
          "foreign_word": "여보세요",
          "translation": "hello",
          "definition": "Ut ullam qui omnis qui.",
          "illustrations": [
            "http://someurl.com"
          ],
          "audio": [
            "http://someurl.com"
          ],
          "failed_attempts": 0,
          "successful_attempts": 0,
          "rating": "new",
          "review_session": {},
          "additional_info": {
            "meta_data": {
              "created_by": "kelvin_sauer",
              "created_at": 1579726461761
            },
            "tags": [
              "family",
              "fun",
              "ideas",
              "color"
            ],
            "notes": {}
          }
        }
      ]
    }
  ]
}
```

    # results list of decks are paginated.
    # regular deck
    # Response:

```json
{
  "decks": [
    {
      "deck_id": "d091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "user_id": "u091bdcd-2c08-4e5e-852c-289b75ba6f18",
      "username": "testuser",
      "avatar": "http://avatar.com",
      "deck_title": "Study Korean",
      "thumbnail": "http://someurl.com/image.png",
      "description": "Basic Korean words.",
      "category": "language",
      "created_at": 1579726461765,
      "updated_at": 1579726461765,
      "deck_card_total": 1,
      "tags": [],
      "collection": [
        {
          "card_id": "c091bdcd-2c08-4e5e-852c-289b75ba6f18",
          "parts_of_speech": "verb",
          "foreign_language": "Korean",
          "native_language": "English",
          "foreign_word": "여보세요",
          "translation": "hello",
          "definition": "Ut ullam qui omnis qui.",
          "illustrations": [
            "http://someurl.com"
          ],
          "audio": [
            "http://someurl.com"
          ],
          "additional_info": {
            "meta_data": {
              "created_by": "kelvin_sauer",
              "created_at": 1579726461761
            },
            "tags": [
              "family",
              "fun",
              "ideas",
              "color"
            ],
          }
        }
      ]
    }
  ]
}
```

## _Card list / cards paginated results_

| Method | Status | Endpoint                       |
| :----: | -----: | :----------------------------- |
|  GET   |    200 | `/api/list-all?resource=cards` |

    # results list of cards are paginated.
    # Response:

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
          "deck_title": "forgot",
          "description": "Basic Korean words.",
          "category": "language"
        }
      ]
    }
  ]
}
```

## _User card list_

| Method | Status | Endpoint                                                       |
| :----: | -----: | :------------------------------------------------------------- |
|  GET   |    200 | `/api/user/cards?user_id=u091bdcd-2c08-4e5e-852c-289b75ba6f18` |

    # results list of all cards of a user, grouped by card list.
    # Response:

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
      "description": "Basic Korean words.",
      "category": "language",
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

## _User deck list_

| Method | Status | Endpoint                                                       |
| :----: | -----: | :------------------------------------------------------------- |
|  GET   |    200 | `/api/user/decks?user_id=u091bdcd-2c08-4e5e-852c-289b75ba6f18` |

    # results list of all cards of a user, grouped by deck list.
    # Response:

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
      "description": "Basic Korean words.",
      "category": "language",
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

## _user list / users paginated results_

| Method | Status | Endpoint                                     |
| :----: | -----: | :------------------------------------------- |
|  GET   |    200 | `/api/list-all?resource=users&grouped=cards` |

    # results list of paginated users,
      with all cards grouped by card collection.
    # Response:

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
          "description": "Basic Korean words.",
          "category": "language",
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

| Method | Status | Endpoint                                     |
| :----: | -----: | :------------------------------------------- |
|  GET   |    200 | `/api/list-all?resource=users&grouped=decks` |

    # results list of paginated users,
      with all cards grouped by decks.
    # Response:

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
          "description": "Basic Korean words.",
          "category": "language",
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

| Method | Status | Endpoint                       |
| :----: | -----: | :----------------------------- |
|  GET   |    200 | `/api/list-all?resource=users` |

    # results list of paginated users,
      no cards and decks.
    # Response:

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

appellative
append
amalgamation
elucidate
composition
statement
structure
footnote

```json
{
  "appellation": {
    "meta_data": {
      "created_by": "username",
      "created_at": "datetime string"
    },
    "description": {
      "comment": "text"
    }
  }
}

{
  "file_assets": {
    "illustrations": [],
    "audio_clips": [],
    "media_clips": []
  }
}
```
