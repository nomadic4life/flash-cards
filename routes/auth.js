const auth = model => {
  const login = async (req, res) => {
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

    try {
      const message = await model.loginUser({ username, password });
      res.status(200).json({ message });
    } catch (err) {
      res.status(unauthorized).json({ message: "Incorrect Credentials" });
    }
  };

  const signup = () => {};

  return {
    login,
    signup
  };
};

module.exports = auth;
