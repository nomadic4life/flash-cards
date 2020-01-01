const userDependencyDatabaseInjection = db => {
  // should return user info
  // should return no user if not found
  // should return error 500 if something unexpected happened
  const findUser = ({ username }) => {
    return db("user")
      .where({ username })
      .first("id", "username", "password");
  };

  return {
    findUser
  };
};

module.exports = userDependencyDatabaseInjection;
