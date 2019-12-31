const validAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const unauthorized = 401;

  const data = authorization.split(" ");

  if (data[0] !== "Basic") {
    return res.status(unauthorized).json({ message: "Not Basic Auth Type." });
  }

  const buff = new Buffer(data[1], "base64");
  const text = buff.toString();
  const username = text.split(":")[0];
  const password = text.split(":")[1];

  if (password === "" || username === "") {
    return res.status(unauthorized).json({ message: "Missing Credentials" });
  }

  req.credentials = {
    username,
    password
  };

  next();
};

const checkUser = async (req, res, next) => {
  const { username } = req.credentials;
  const user = await findByUsername(username);
};

module.exports = {
  validAuth,
  checkUser
};
