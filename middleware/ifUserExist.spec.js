const ifUserExist = require("./ifUserExist");
const StatusError = require("../utils/errors");
jest.mock("../models");

describe("ifUserExist middleware", () => {
  it("should call next() if no user exist", () => {
    const req = {
      user: {
        username: "newUserTest"
      }
    };

    const res = {};

    return ifUserExist(req, res, () => {
      //   expect(error).toBeInstanceOf(StatusError);
      //   expect(error.status).toBe(4);
      //   expect(error.statusMessage).toBe("Username must not contain spaces.");
      expect(req.user.username).toBe("newUserTest");
    });
  });

  it("should call next(error) if user exist", () => {
    const req = {
      user: {
        username: "testuser"
      }
    };

    const res = {};

    return ifUserExist(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(409);
      expect(error.statusMessage).toBe("Username already Taken.");
    });
  });
});
