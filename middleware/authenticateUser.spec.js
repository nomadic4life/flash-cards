const request = require("supertest");
const server = require("../api-server");

jest.mock("../models");

describe("  03 - Should return 401 HTTP status code for", () => {
  it("03.6 Username not found.", () => {
    const username = "wrongusername",
      password = "TestPass";
    return request(server)
      .post("/api/auth/login")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Invalid Credentials.");
        expect(response.status).toBe(401);
      });
  });

  it("03.7 Incorrect password.", () => {
    const username = "testuser",
      password = "password";
    return request(server)
      .post("/api/auth/login")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Invalid Credentials.");
        expect(response.status).toBe(401);
      });
  });
});
