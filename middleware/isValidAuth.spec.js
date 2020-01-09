const isValidAuth = require("./isValidAuth");
const dummyData = require("../data/mockData");
const StatusError = require("../utils/errors");

describe("isValidAuth middleware", () => {
  it("should call next() if valid auth that is sanitize.", () => {
    const req = {
      headers: {
        authorization:
          "basic " + Buffer.from("  testuser  :  TestPass  ").toString("base64")
      }
    };

    const res = {};

    return isValidAuth(req, res, () => {
      expect(req).toHaveProperty("user");
      expect(req.user).toHaveProperty("username", "testuser");
      expect(req.user).toHaveProperty("password", "TestPass");
    });
  });

  it("should call next(error) if no username and password givin.", () => {
    const req = {
      headers: {}
    };

    const res = {};

    return isValidAuth(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(401);
      expect(error.statusMessage).toBe("Username and Password required.");
    });
  });

  it("should call next(error) if not basic auth type.", () => {
    const req = {
      headers: {
        authorization: "bearer"
      }
    };

    const res = {};

    return isValidAuth(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(401);
      expect(error.statusMessage).toBe("Basic Auth Type is required.");
    });
  });

  it("should call next(error) if empty username and password.", () => {
    const req = {
      headers: {
        authorization: "basic " + Buffer.from(":").toString("base64")
      }
    };

    const res = {};

    return isValidAuth(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(401);
      expect(error.statusMessage).toBe("Missing Credentials.");
    });
  });

  it("should call next(error) if empty username.", () => {
    const req = {
      headers: {
        authorization: "basic " + Buffer.from(":TestPass").toString("base64")
      }
    };

    const res = {};

    return isValidAuth(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(401);
      expect(error.statusMessage).toBe("Missing Credentials.");
    });
  });

  it("should call next(error) if empty password.", () => {
    const req = {
      headers: {
        authorization: "basic " + Buffer.from("testuser:").toString("base64")
      }
    };

    const res = {};

    return isValidAuth(req, res, error => {
      expect(error).toBeInstanceOf(StatusError);
      expect(error.status).toBe(401);
      expect(error.statusMessage).toBe("Missing Credentials.");
    });
  });
});
