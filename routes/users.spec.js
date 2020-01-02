const request = require("supertest");
const server = require("../api-server");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "temp";

describe("GET /api/users/all", () => {
  const user = {
    id: 1,
    username: "testuser",
    password: "TestPass"
  };

  const payload = {
    id: user.id,
    username: user.username
  };

  it("Should return 200, with list of users", () => {
    return request(server)
      .get("/api/users/all")
      .set("authorization", jwt.sign(payload, secret))
      .then(response => {
        expect(response.status).toBe(200);
      });
  });
});
