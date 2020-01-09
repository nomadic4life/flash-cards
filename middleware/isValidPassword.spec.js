const StatusError = require("../utils/errors");
const isValidPassword = require("./isValidPassword");
const bcrypt = require("bcrypt");
const saltRounds = 10;

describe("isValidPassword middleware", () => {
  it("should call next() if valid password", () => {
    const req = {
      user: {
        password: "TestPass"
      }
    };
    const res = {};

    return isValidPassword(req, res, () => {
      expect(req.user.password).not.toBe("TestPass");
      expect(bcrypt.compareSync("TestPass", req.user.password)).toBe(true);
    });
  });

  it("should call next(error) if password includes spaces", () => {
    const req = {
      user: {
        password: "Test Pass"
      }
    };
    const res = {};

    return isValidPassword(req, res, error => {
      expect(error.status).toBe(400);
      expect(error.statusMessage).toBe("Password must not contain spaces.");
    });
  });

  it("should call next(error) if password less than 6 characters", () => {
    const req = {
      user: {
        password: "Pass"
      }
    };
    const res = {};

    return isValidPassword(req, res, error => {
      expect(error.status).toBe(400);
      expect(error.statusMessage).toBe(
        "Password must have at least 6 characters."
      );
    });
  });
});
