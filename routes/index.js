const authenticationRoutes = require("./authenticationRoutes");
const generalRoutes = require("./generalRoutes");
const { testModel, userModel, deckModel } = require("../models");
const { isAuthenticated } = require("../middleware");

// root route for sanity check
// list all users
// list all cards
// list all decks
// list all decks for a user
// list all cards in a deck
// list all users that hold copies of a specific deck
// list all users that hold copies of a specific card
// list all decks that a specific card is in
// user can copy another users deck
// user can copy another card from a deck into a different deck
// user can display what cards in a specific deck based on user or specific card
// user can add card to a deck from card table or adding a new card to card table
// user can delete card from deck, still exist on card table if no users have card in deck, card is deleted from card table
// user can update/edit card from deck, new card is created onto table
// user can get/read card from deck
// user can delete deck
// user can get deck
// user can update deck
// user can check every user that has a card in deck
// user login
// user signup
// track user status
// track deck status
// track card status
// users have a status table

module.exports = router => {
  // all routes are passed into router
  authenticationRoutes(router);
  router.get("/test", async (req, res) => {
    // const users = await userModel.userData(
    //   "e091bdcd-2c08-4e5e-852c-289b75ba6f18"
    // );
    // res.status(200).json(users);

    const decks = await deckModel.listDecks({});
    res.status(200).json(decks);
  });

  router.use(isAuthenticated);
  generalRoutes(router);

  // router.get("/users/all", isAuthenticated, listUsers);
  // router.get("/users/:any", users);

  return router;
};
