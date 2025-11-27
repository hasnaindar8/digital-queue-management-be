const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const data = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("POST /api/auth/signup", () => {
  it("status:201, responds with no content", () => {
    const validRequestBody = {
      firstName: "John",
      surname: "Smith",
      email: "smith@gmail.com",
      phoneNumber: "+4479934442",
      password: "xyz#123",
    };

    return request(app)
      .post("/api/auth/signup")
      .send(validRequestBody)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });

  it("status:409, responds with an error message if email already exists", () => {
    const validRequestBody = {
      firstName: "John",
      surname: "Smith",
      email: "smith@gmail.com",
      phoneNumber: "+4479934442",
      password: "xyz#123",
    };

    return request(app)
      .post("/api/auth/signup")
      .send(validRequestBody)
      .expect(409)
      .then(({ body }) => {
        expect(body.msg).toBe("A record with this value already exists");
      });
  });

  it("status:400, responds with an error message if email already exists", () => {
    const invalidRequestBody = {
      firstName: "John",
      email: "john@gmail.com",
      password: "xyz#123",
    };

    return request(app)
      .post("/api/auth/signup")
      .send(invalidRequestBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });

  it("status:400, responds with an error message if fields have wrong data type", () => {
    const validRequestBody = {
      firstName: 123,
      surname: true,
      email: [],
      phoneNumber: +4479934442,
      password: 123456,
    };

    return request(app)
      .post("/api/auth/signup")
      .send(validRequestBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("POST /api/auth/login", () => {
  it("status:200, responds user object", () => {
    const validUser = { email: "example1@email.com", password: "password1" };
    return request(app)
      .post("/api/auth/login/")
      .send(validUser)
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveProperty("user");
        const user = body["user"];
        expect(user).toBeInstanceOf(Object);
        expect(typeof user["userId"]).toBe("number");
        expect(typeof user["firstName"]).toBe("string");
        expect(typeof user["surname"]).toBe("string");
        expect(typeof user["type"]).toBe("string");
        expect(user["userId"]).toBe(1);
        expect(user["firstName"]).toBe("jamie");
        expect(user["surname"]).toBe("marsh-feay");
        expect(user["type"]).toBe("patient");
      });
  });

  it("status:401, responds an error message if the reg_status is false", () => {
    const validUser = { email: "example3@email.com", password: "password3" };
    return request(app)
      .post("/api/auth/login")
      .send(validUser)
      .expect(401)
      .then(({ body }) => {
        expect(body).toHaveProperty("msg");
        expect(body["msg"]).toBe("Registration process pending");
      });
  });

  it("status:400, responds an error message if the email and password is empty", () => {
    const invalidUser = { email: "", password: "" };
    return request(app)
      .post("/api/auth/login")
      .send(invalidUser)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request");
      });
  });

  it("status:404, responds an error message if the email does not exist", () => {
    const invalidUser = {
      email: "example10@email.com",
      password: "password123",
    };
    return request(app)
      .post("/api/auth/login")
      .send(invalidUser)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("No user found for email: example10@email.com");
      });
  });

  it("status:400, responds an error message if the required field is null", () => {
    const invalidUser = {
      email: null,
      password: null,
    };
    return request(app)
      .post("/api/auth/login")
      .send(invalidUser)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request");
      });
  });
});
