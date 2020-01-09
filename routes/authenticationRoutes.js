const { login, signup } = require("../controllers/auth");
const {
  isValidAuth,
  authenticateUser,
  generateToken,
  isValidUsername,
  isValidPassword,
  ifUserExist,
  createNewUser
} = require("../middleware");

module.exports = router => {
  router.use("/auth", isValidAuth);

  router.post("/auth/login", [authenticateUser, generateToken], login);

  router.post(
    "/auth/signup",
    [
      isValidUsername,
      ifUserExist,
      isValidPassword,
      createNewUser,
      generateToken
    ],
    signup
  );
};
