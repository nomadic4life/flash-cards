const db = require("../data/db");
const userModel = require("./user_models")(db);
const testModel = require("./test_models")(db);

module.exports = {
  userModel,
  testModel
};
