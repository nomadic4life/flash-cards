// import all routes here

const auth = require("./auth");
const { validAuth } = require("../middleware");
const wrapAsync = require("../utils/wapper_handler");
const { userModel } = require("../models");

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

module.exports = (router, model) => {
  const authRoutes = auth(model);
  // all routes are passed into router
  router.use("/auth", validAuth);
  router.post("/auth/login", wrapAsync(authRoutes.login));
  router.post("/auth/signup", authRoutes.signup);

  router.post("/test", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    try {
      const user = await userModel.findByUsername(username);
      console.log(user, "user");
      res.status(200).json({ message: user || "no user found" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server side error" });
    }
  });
  return router;
};
