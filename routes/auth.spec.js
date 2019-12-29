require("dotenv").config();
const request = require("supertest");
const server = require("../api-server");
const model = require("./mockModel");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "temp";

describe("POST /api/auth/login", () => {
  it("should return 200 http status code with Token.", async () => {
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

describe("POST /api/auth/signup", () => {
  it("should return 201 http status code with Token.", () => {
    const username = "username2",
      password = "password2";
    return request(server(model))
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        const payload = {
          id: 1,
          username
        };
        expect(message).toBe(jwt.sign(payload, secret));
        expect(response.status).toBe(201);
      });
  });

  it("should return 401 http status code for wrong Auth type", () => {
    const username = "username2",
      passord = "password2";
    return request(server("this should be a model"))
      .post("/api/auth/signup")
      .auth(username, passord, { type: "bearer" })
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Not Basic Auth Type.");
        expect(response.status).toBe(401);
      });
  });

  it("should return 409 http status code, username already exist.", () => {
    const username = "username",
      password = "password2";
    return request(server(model))
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("username already exist, try another username.");
        expect(response.status).toBe(409);
      });
  });

  it("should return 400 http status code, password contains spaces.", () => {
    const username = "username2",
      password = "pass word2";
    return request(server(model))
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("password must not contain spaces.");
        expect(response.status).toBe(400);
      });
  });

  it("should return 400 http status code, password is less then 6 characters.", () => {
    const username = "username2",
      password = "pass";
    return request(server(model))
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe(
          "password must be a minimum of 6 characters long."
        );
        expect(response.status).toBe(400);
      });
  });

  it("should return 400 http status code, username contains space.", () => {
    const username = "user name2",
      password = "password2";
    return request(server(model))
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("username must not contain spaces.");
        expect(response.status).toBe(400);
      });
  });
});
