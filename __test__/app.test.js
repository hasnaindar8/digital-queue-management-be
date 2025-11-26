const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");
const app = require("../app.js");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("DELETE /api/queue_entries/:entry_id", () => {
  test("204: Responds with status 204 and no content when patient is removed from queue", () => {
    return request(app)
    .delete("/api/queue_entries/3")
    .expect(204)
    .then(({body}) => {
        expect(body).toEqual({})
    })
  });
  test("400: Responds with error message when delete request is made with invalid entry_id type", () => {
    return request(app)
    .delete("/api/queue_entries/not_a_real_id")
    .expect(400)
    .then(({body: {msg}}) => {
        expect(msg).toBe("Invalid input syntax")
    })
  }); 
  test("404: Responds with error message when delete request is made with valid entry_id that does not exist", () => {
    return request(app)
    .delete("/api/queue_entries/50000")
    .expect(404)
    .then(({body: {msg}}) => {
        expect(msg).toBe("Not Found")
    })
  });
});
