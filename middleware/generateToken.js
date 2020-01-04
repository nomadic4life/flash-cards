const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "temp";
const StatusError = require("../utils/errors");

const generateToken = async (req, res, next) => {
  const { id, username } = req.user;
  const payload = {
    id,
    username
  };

  await jwt.sign(payload, secret, (err, token) => {
    if (err) {
      // no test for this. need to figure out how to add tests for here
      return next(new StatusError("Server Error with Token", 500));
    }
    res.set("Authorization", "bearer " + token);
    next();
  });
};

module.exports = generateToken;
