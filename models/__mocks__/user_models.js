const bcrypt = require("bcrypt");
const saltRounds = 10;
const StatusError = require("../../utils/errors");
const dummyData = require("../../data/mockData");

const error = () => {
  if (username === "error") {
    throw new StatusError("Server Error.", 500);
  }
};

const findUser = ({ username }) => {
  if (username === "error") {
    throw new StatusError("Server Error.", 500);
  }

  return username === "testuser" ? dummyData.users[0] : undefined;
};

const createUser = ({ username, password }) => {
  if (username === "error") {
    throw new StatusError("Server Error.", 500);
  }

  return {
    id: dummyData.users.length,
    username,
    password
  };
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
