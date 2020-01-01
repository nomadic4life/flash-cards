const userDependencyDatabaseInjection = db => {
  // should return user info
  // should return no user if not found
  // should return error 500 if something unexpected happened
  const findUser = ({ username }) => {
    return db("user")
      .where({ username })
      .first("id", "username", "password");
  };

  const createUser = ({ username, password }) => {
    return db("user")
      .insert({ username, password })
      .findUser({ username });
  };

  return {
    findUser,
    createUser
  };
};

module.exports = userDependencyDatabaseInjection;
