const users = (req, res) => {
  const { authorization } = req.headers;
  console.log(authorization);
  res.status(200).end();
};

module.exports = {
  users
};
