const wrapAsync = require("../utils/wrapAsyncHandler");

const users = (req, res) => res.status(200).json({ data: req.data });
module.exports = {
  users: wrapAsync(users)
};
