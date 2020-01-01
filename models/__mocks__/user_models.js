const bcrypt = require("bcrypt");
const saltRounds = 10;
const StatusError = require("../../utils/errors");

const findUser = ({ username }) => {
  if (username === "error") {
    throw new StatusError("Server Error.", 500);
  }

  return username === "testuser"
    ? {
        id: 1,
        username: "testuser",
        password: bcrypt.hashSync("TestPass", saltRounds)
      }
    : undefined;
};

const userModel = {
  findUser
};

module.exports = userModel;

// user = {
//   id: 0,
//   username: "testuser",
//   password: "TestPassword"
// }

// user = {}

// user = new Error()
