require("dotenv").config();
const request = require("supertest");
const server = require("../api-server");
const model = require("./mockModel");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "temp";

describe("POST /api/auth/login", () => {
  it("should return 200 http status code.", async () => {
    const username = "username",
      passord = "password";
    const response = await request(server(model))
      .post("/api/auth/login")
      .auth(username, passord);

    const { message } = response.body;

    const payload = {
      id: 0,
      username
    };

    expect(message).toBe(jwt.sign(payload, secret));
    expect(response.status).toBe(200);
  });

  it("should return 401 for missing passord with message", () => {
    const username = "username",
      passord = "";
    return request(server("this should be a model"))
      .post("/api/auth/login")
      .auth(username, passord)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Missing Credentials");
        expect(response.status).toBe(401);
      });
  });

  it("should return 401 for missing username with message", () => {
    const username = "",
      passord = "password";
    return request(server("this should be a model"))
      .post("/api/auth/login")
      .auth(username, passord)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Missing Credentials");
        expect(response.status).toBe(401);
      });
  });

  it("should return 401 for missing username and password with message", () => {
    const username = "",
      passord = "";
    return request(server("this should be a model"))
      .post("/api/auth/login")
      .auth(username, passord)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Missing Credentials");
        expect(response.status).toBe(401);
      });
  });

  it("should return 401 for wrong Auth type", () => {
    const username = "username",
      passord = "password";
    return request(server("this should be a model"))
      .post("/api/auth/login")
      .auth(username, passord, { type: "bearer" })
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Not Basic Auth Type.");
        expect(response.status).toBe(401);
      });
  });

  it("should return 401 http status code for incorrect username or password.", () => {
    const username = "wrongusername",
      passord = "wrongpassword";
    return request(server(model))
      .post("/api/auth/login")
      .auth(username, passord)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Incorrect Credentials");
        expect(response.status).toBe(401);
      });
  });
});
