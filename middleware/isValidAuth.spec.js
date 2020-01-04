const request = require("supertest");
const server = require("../api-server");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "temp";
const dummyData = require("../data/mockData");

describe("  03 - Should return 401 HTTP status code for", () => {
  it("auth check", () => {
    const username = "username",
      password = "password";
    return request(server)
      .post("/api/auth")
      .auth(username, password)
      .then(response => {
        expect(response.status).toBe(200);
      });
  });

  it("03.1 Empty Authorization in header.", () => {
    return request(server)
      .post("/api/auth")
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Username and Password required.");
        expect(response.status).toBe(401);
      });
  });

  it("03.2 Wrong Authorization type.", () => {
    const username = "username",
      password = "password";
    return request(server)
      .post("/api/auth")
      .auth(username, password, { type: "bearer" })
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Basic Auth Type is required.");
        expect(response.status).toBe(401);
      });
  });

  it("03.3 Missing password.", () => {
    const username = "username",
      password = "";
    return request(server)
      .post("/api/auth")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Missing Credentials.");
        expect(response.status).toBe(401);
      });
  });

  it("03.4 Missing username.", () => {
    const username = "",
      password = "password";
    return request(server)
      .post("/api/auth")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Missing Credentials.");
        expect(response.status).toBe(401);
      });
  });

  it("03.5 Missing username and password.", () => {
    const username = "",
      password = "";
    return request(server)
      .post("/api/auth")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Missing Credentials.");
        expect(response.status).toBe(401);
      });
  });
});
