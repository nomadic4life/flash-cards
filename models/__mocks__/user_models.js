const bcrypt = require("bcrypt");
const saltRounds = 10;
const StatusError = require("../../utils/errors");
const dummyData = require("../../data/mockData");

const error = () => {
  if (username === "error") {
    throw new StatusError("Server Error.", 500);
  }
};

const findUser = ({ username, email }) => {
  if (username === "error") {
    throw new StatusError("Server Error.", 500);
  }
  let results;


  results = username === "testuser"
    ? dummyData.users[0]
    : email === "testuser@test.com"
      ? dummyData.users[0]
      : undefined;

  return results
};

const createUser = ({ username, email, avatar, password }) => {
  if (username === "error") {
    throw new StatusError("Server Error.", 500);
  }

  return [{
    id: dummyData.users.length,
    avatar,
    username,
    email,
    password,
    created_at: Date.now(),
    updated_at: Date.now()
  }];
};

const fetchAll = ({ page, perPage }) => {
  if (page === "error") {
    throw new StatusError("Server Error.", 500);
  }

  return dummyData.users
    .filter((user, index) => index < page * perPage + perPage)
    .map(user => ({ id: user.id, username: user.username }));
};

const userModel = {
  findUser,
  createUser,
  fetchAll
};

module.exports = userModel;
