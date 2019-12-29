const auth = model => {
  const login = async (req, res) => {
    const { username, password } = req.credentials;
    try {
      const message = await model.loginUser({ username, password });
      res.status(200).json({ message });
    } catch (err) {
      res.status(401).json({ message: "Incorrect Credentials" });
    }
  };

  const signup = async (req, res) => {
    const { username, password } = req.credentials;
    try {
      const message = await model.signupUser({ username, password });
      return res.status(201).json({ message });
    } catch (err) {
      res.status(err.status).json({ message: err.message });
    }
  };

  return {
    login,
    signup
  };
};

module.exports = auth;

// check if username is valid type,
// check if password is valid type
// username in database, if user exit return username beging used. if username not exit create new user
