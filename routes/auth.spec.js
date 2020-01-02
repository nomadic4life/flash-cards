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

    const { authorization } = response.header;

    const payload = {
      id: 1,
      username
    };

    expect(authorization.split(" ")[1]).toBe(jwt.sign(payload, secret));
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

describe("\nPOST /api/auth/signup", () => {
  it("should return 201 http status code with Token.", () => {
    const username = "testuser2",
      password = "TestPass";
    return request(server)
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
        const { authorization } = response.header;
        const payload = {
          id: 2,
          username
        };
        expect(authorization.split(" ")[1]).toBe(jwt.sign(payload, secret));
        expect(response.status).toBe(201);
      });
  });

  it("should return 500 http status code.", () => {
    const username = "error",
      password = "TestPass";
    return request(server)
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
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
  });

  it("should return 409 http status code, username already taken.", () => {
    const username = " TestUser ",
      password = "TestPass";
    return request(server)
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Username already Taken.");
        expect(response.status).toBe(409);
      });
  });

  it("should return 400 http status code, username contains spaces.", () => {
    const username = " Test User2",
      password = "TestPass";
    return request(server)
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Username must not contain spaces.");
        expect(response.status).toBe(422);
      });
  });

  it("should return 400 http status code, password contains spaces.", () => {
    const username = " TestUser2",
      password = "Test Pass";
    return request(server)
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Password must not contain spaces.");
        expect(response.status).toBe(422);
      });
  });

  it("should return 400 http status code, password to short.", () => {
    const username = " TestUser2",
      password = "Pass";
    return request(server)
      .post("/api/auth/signup")
      .auth(username, password)
      .then(response => {
        const { message } = response.body;
        expect(message).toBe("Password must have at least 6 characters.");
        expect(response.status).toBe(422);
      });
  });
});
