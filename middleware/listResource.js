const { userModel, deckModel, cardModel } = require("../models");
const listResource = async (req, res, next) => {
  let { resource = "users", page = 0, perPage = 10 } = req.query;

  const resourceList = {
    users: userModel
    // cards: cardModel,
    // decks: deckModel
  };

  if (!resource || !resourceList[resource]) {
    resource = "users";
  }

  const resourceModel = resourceList[resource];

  const data = resourceModel.fetchAll({ page, perPage });

  req.data = { [resource]: data, page };

  next();
};

module.exports = listResource;
