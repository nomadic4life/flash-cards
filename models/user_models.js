const databaseDependencyIntjector = db => {
  // should return user info
  // should return no user if not found
  // should return error 500 if something unexpected happened
  const findByUsername = username => {
    return db("user")
      .where({ username })
      .first("id", "username", "password");
  };

  return {
    findByUsername
  };
};

module.exports = databaseDependencyIntjector;

// user = {
//   id: 0,
//   username: "testuser",
//   password: "TestPassword"
// }

// user = {}

// user = new Error()

// const findByUsername = username => {
//   throw new Error("internal error");
//   return undefined
//   return {
//     id: 0,
//     username: "testuser",
//     password: "TestPass"
//   }
// };
