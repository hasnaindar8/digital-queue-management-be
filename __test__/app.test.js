const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const data = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("ALL: *", () => {
  it("status:404, responds with not found when a request is made to an undefined / non-existent endpoint", () => {
    return request(app)
      .get("/notAnEndpoint")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
});

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

describe("GET /api/reasons", () => {
  it("status:200, responds with an array of the reasons", () => {
    return request(app)
      .get("/api/reasons")
      .expect(200)
      .then(({ body }) => {
        const reasons = body.reasons;
        expect(reasons).toBeInstanceOf(Array);
        expect(reasons.length).toBe(3);
        reasons.forEach((reason) => {
          expect(typeof reason.reason_id).toBe("number");
          expect(typeof reason.label).toBe("string");
        });
      });
  });
});

describe("DELETE /api/queue/:entry_id", () => {
  it("204: Responds with status 204 and no content when patient is removed from queue", () => {
    return request(app)
      .delete("/api/queue/3")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });

  it("400: Responds with error message when delete request is made with invalid entry_id type", () => {
    return request(app)
      .delete("/api/queue/not_a_real_id")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid input syntax");
      });
  });

  it("404: Responds with error message when delete request is made with valid entry_id that does not exist", () => {
    return request(app)
      .delete("/api/queue/50000")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("No entry found to delete with entry_id: 50000");
      });
  });
});
