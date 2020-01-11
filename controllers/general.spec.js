const request = require("supertest");
const server = require("../api-server");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "temp";
const dummyData = require("../data/mockData");

jest.mock("../models");

describe("GET /api/list-all?resource=users", () => {
  const user = {
    id: dummyData.users[0].id,
    username: dummyData.users[0].username,
    password: "TestPass"
  };

  const payload = {
    id: user.id,
    username: user.username
  };

  //   it("Should return 200, with list of users", () => {
  //     return request(server)
  //       .get("/api/list-all?resource=users")
  //       .set("authorization", `Bearer ${jwt.sign(payload, secret)}`)
  //       .then(response => {
  //         const { data } = response.body;
  //         console.log(data);
  //         expect(response.status).toBe(200);
  //       });
  //   });

  it("Should return 500, server error", () => {
    return request(server)
      .get("/api/list-all?resource=users&page=error")
      .set("authorization", `bearer ${jwt.sign(payload, secret)}`)
      .then(response => {
        const { data, message } = response.body;
        expect(data).toBe(undefined);
        expect(message).toBe("Server Error.");
        expect(response.status).toBe(500);
      });
  });
});
