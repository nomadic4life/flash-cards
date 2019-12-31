const db = require("../data/db");
// console.log(db);
const userModel = require("./user_models")(db);
console.log(userModel);

module.exports = {
  userModel
};
