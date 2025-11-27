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
  test("status:200, responds an object containing a property of user_type", () => {
    const validUser = { email: "example1@email.com", password: "password1" };
    return request(app)
      .post("/api/auth/login/")
      .send(validUser)
      .expect(200)
      .then(({ body }) => {
        const { user_type } = body;
        expect(typeof user_type).toBe("string");
        expect(user_type).toBe("patient");
      });
  });
  test("status:400, responds an error message if the email and password is empty", () => {
    const invalidUser = { email: "", password: "" };
    return request(app)
      .post("/api/auth/login/")
      .send(invalidUser)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request");
      });
  });
  test("status:404, responds an error message if the email does not exist", () => {
    const invalidUser = {
      email: "example10@email.com",
      password: "password123",
    };
    return request(app)
      .post("/api/auth/login/")
      .send(invalidUser)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("User does not exist");
      });
  });
  test("status:400, responds an error message if the required field is null", () => {
    const invalidUser = {
      email: null,
      password: null,
    };
    return request(app)
      .post("/api/auth/login/")
      .send(invalidUser)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request");
      });
  });
  test("status:404, responds an error message if the api is not valid", () => {
    const validUser = {
      email: "example1@email.com",
      password: "password1",
    };
    return request(app)
      .post("/api/auth/logn/")
      .send(validUser)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Path not found");
      });
  });
});
