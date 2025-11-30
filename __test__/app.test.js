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

describe("POST /api/queue/join", () => {
  it("status:201, responds with the newly created queue entry", () => {
    const validRequestBody = {
      user_id: 1,
      reason_id: 1,
    };

    return request(app)
      .post("/api/queue/join")
      .send(validRequestBody)
      .expect(201)
      .then(({ body }) => {
        const queueEntry = body.queueEntry;
        expect(queueEntry.user_id).toBe(validRequestBody.user_id);
        expect(queueEntry.reason_id).toBe(validRequestBody.reason_id);
      });
  });

  it("status:400, responds with an error message when passed a body that does not contain the correct fields", () => {
    const invalidRequestBody = {
      birthstone: 1,
      faveFood: 1,
    };

    return request(app)
      .post("/api/queue/join")
      .send(invalidRequestBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });

  it("status:400, responds with an error message when passed a body that contains the correct fields but at least one field value is invalid", () => {
    const invalidRequestBodies = [
      {
        user_id: "1",
        reason_id: 1,
      },
      {
        user_id: 2,
        reason_id: "2",
      },
    ];

    const testRequests = invalidRequestBodies.map((invalidRequestBody) => {
      return request(app)
        .post("/api/queue/join")
        .send(invalidRequestBody)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });

    return Promise.all(testRequests);
  });

  it("status:409, responds with an error message when passed a body that contains valid user and reason IDs, but at least one doesn't exist", () => {
    const validRequestBodies = [
      {
        user_id: 20,
        reason_id: 1,
      },
      {
        user_id: 1,
        reason_id: 10,
      },
    ];

    const testRequests = validRequestBodies.map((validRequestBody) => {
      return request(app)
        .post("/api/queue/join")
        .send(validRequestBody)
        .expect(409)
        .then(({ body }) => {
          expect(body.msg).toBe("Referenced record does not exist");
        });
    });

    return Promise.all(testRequests);
  });
});
