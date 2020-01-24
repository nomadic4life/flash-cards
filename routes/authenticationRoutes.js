const { login, signup } = require("../controllers/auth");
const {
  isValidAuth,
  authenticateUser,
  generateToken,
  isValidUsername,
  isValidEmail,
  isValidPassword,
  ifUserExist,
  // storeAvatar,
  createNewUser
} = require("../middleware");

module.exports = router => {
  router.use("/auth", isValidAuth);

  router.post("/auth/login", [authenticateUser, generateToken], login);

  router.post(
    "/auth/signup",
    [
      isValidUsername,
      isValidEmail,
      ifUserExist,
      isValidPassword,
      // storeAvatar,
      createNewUser,
      generateToken
    ],
    signup
  );
};
