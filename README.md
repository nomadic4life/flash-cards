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
