// const stuff = require("../index")
const model = jest.genMockFromModule("../index");

function findByUsername(directoryPath) {
  return {
    id: 1,
    username: "testuser",
    password: "TestPass"
  };
}

model.findByUsername = findByUsername;

module.exports = module;
