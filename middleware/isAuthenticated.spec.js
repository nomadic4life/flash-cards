const request = require("supertest");
const server = require("../api-server");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "temp";
const dummyData = require("../data/mockData");

describe("/api/list-all, testing auth ,Should return 401 for", () => {
  const user = {
    id: dummyData.users[0].id,
    username: dummyData.users[0].username,
    password: "TestPass"
  };

  const payload = {
    id: user.id,
    username: user.username
  };
  it("No Auth token.", () => {
    return request(server)
      .get("/api/list-all")
      .then(response => {
        const { data, message } = response.body;
        expect(data).toBe(undefined);
        expect(message).toBe("Token is required.");
        expect(response.status).toBe(401);
      });
  });

  it("Incorrect Auth type.", () => {
    return request(server)
      .get("/api/list-all")
      .set("authorization", `basic ${jwt.sign(payload, secret)}`)
      .then(response => {
        const { data, message } = response.body;
        expect(data).toBe(undefined);
        expect(message).toBe("Bearer Auth Type is required.");
        expect(response.status).toBe(401);
      });
  });

  it("Incorrect token.", () => {
    return request(server)
      .get("/api/list-all")
      .set("authorization", `Bearer ${jwt.sign(payload, "secret")}`)
      .then(response => {
        const { data, message } = response.body;
        expect(data).toBe(undefined);
        expect(message).toBe("Invalid token.");
        expect(response.status).toBe(401);
      });
  });
});
