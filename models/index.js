const db = require("../data/db");
const userModel = require("./user_models")(db);

module.exports = {
  userModel
};
