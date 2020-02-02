const { login, signup } = require("../controllers/auth");
const {
  isValidAuth,
  authenticateUser,
  generateToken,
  isValidUsername,
  isValidEmail,
  isValidPassword,
  ifUserExist,
  createNewUser,
  uploadAvatar
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
      uploadAvatar,
      createNewUser,
      generateToken
    ],
    signup
  );
};
