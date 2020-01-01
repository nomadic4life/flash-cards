require("dotenv").config();
const request = require("supertest");
const server = require("../api-server");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "temp";

jest.mock("../models");

describe("\nPOST /api/auth/login", () => {
  it("01 - Should return 200 http status code with Token.", async () => {
    const username = "testuser",
      password = "TestPass";
    const response = await request(server)
      .post("/api/auth/login")
      .auth(username, password);

    const { message } = response.body;

    const payload = {
      id: 1,
      username
    };

    expect(message).toBe(jwt.sign(payload, secret));
    expect(response.status).toBe(200);
  });

  it("02 - Should return 500 HTTP status code for server error.", () => {
    const username = "error",
      password = "TestPass";
    return request(server)
      .post("/api/auth/login")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Server Error.");
        expect(response.status).toBe(500);
      });
  });

  describe("  03 - Should return 401 HTTP status code for", () => {
    it("03.1 Empty Authorization in header.", () => {
      return request(server)
        .post("/api/auth/login")
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
        .post("/api/auth/login")
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
        .post("/api/auth/login")
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
        .post("/api/auth/login")
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
        .post("/api/auth/login")
        .auth(username, password)
        .then(response => {
          const { message } = response.body;
          expect(message).toBe("Missing Credentials.");
          expect(response.status).toBe(401);
        });
    });

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
});

// describe("POST /api/auth/signup", () => {
//   it("should return 201 http status code with Token.", () => {
//     const username = "username2",
//       password = "password2";
//     return request(server(model))
//       .post("/api/auth/signup")
//       .auth(username, password)
//       .then(response => {
//         const { message } = response.body;
//         const payload = {
//           id: 1,
//           username
//         };
//         expect(message).toBe(jwt.sign(payload, secret));
//         expect(response.status).toBe(201);
//       });
//   });

//   it("should return 401 http status code for wrong Auth type", () => {
//     const username = "username2",
//       passord = "password2";
//     return request(server("this should be a model"))
//       .post("/api/auth/signup")
//       .auth(username, passord, { type: "bearer" })
//       .then(response => {
//         const { message } = response.body;
//         expect(message).toBe("Not Basic Auth Type.");
//         expect(response.status).toBe(401);
//       });
//   });

//   it("should return 409 http status code, username already exist.", () => {
//     const username = "username",
//       password = "password2";
//     return request(server(model))
//       .post("/api/auth/signup")
//       .auth(username, password)
//       .then(response => {
//         const { message } = response.body;
//         expect(message).toBe("username already exist, try another username.");
//         expect(response.status).toBe(409);
//       });
//   });

//   it("should return 400 http status code, password contains spaces.", () => {
//     const username = "username2",
//       password = "pass word2";
//     return request(server(model))
//       .post("/api/auth/signup")
//       .auth(username, password)
//       .then(response => {
//         const { message } = response.body;
//         expect(message).toBe("password must not contain spaces.");
//         expect(response.status).toBe(400);
//       });
//   });

//   it("should return 400 http status code, password is less then 6 characters.", () => {
//     const username = "username2",
//       password = "pass";
//     return request(server(model))
//       .post("/api/auth/signup")
//       .auth(username, password)
//       .then(response => {
//         const { message } = response.body;
//         expect(message).toBe(
//           "password must be a minimum of 6 characters long."
//         );
//         expect(response.status).toBe(400);
//       });
//   });

//   it("should return 400 http status code, username contains space.", () => {
//     const username = "user name2",
//       password = "password2";
//     return request(server(model))
//       .post("/api/auth/signup")
//       .auth(username, password)
//       .then(response => {
//         const { message } = response.body;
//         expect(message).toBe("username must not contain spaces.");
//         expect(response.status).toBe(400);
//       });
//   });
// });

// describe("testing testing...", () => {
//   it("should test the test route to test mocking of models", async () => {
//     const username = "testuser",
//       password = "TestPass";

//     const response = await request(server)
//       .post("/api/test")
//       .send({ username, password });

//     const { message } = response.body;

//     expect(response.status).toBe(200);
//   });
// });
