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

  const allUsers = () => {
    return db("user");
    // return db
    //   .from("deck")
    //   .innerJoin("user", "user.id", "deck.user_id")
    //   .select("deck.id", "user_id", "username", "user.created_at as created");
    // .leftJoin("user");
  };

  return {
    findUser,
    createUser,
    allUsers
  };
};

module.exports = userDependencyDatabaseInjection;
