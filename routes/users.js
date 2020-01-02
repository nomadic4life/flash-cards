const wrapAsync = require("../utils/wrapAsyncHandler");

const users = (req, res) => {
  const { authorization } = req.headers;
  res.status(200).end();
};

module.exports = {
  users: wrapAsync(users)
};
