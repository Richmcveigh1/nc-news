const request = require("supertest");
const app = require("../db/app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});


describe("GET/api/topics", () => {
    test("200: responds with an array of topic objects with their slug and description", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
            const { topics } = res.body
           expect(topics).toHaveLength(3)
           topics.forEach((topic) => {
            expect(topic).toHaveProperty("slug", expect.any(String))
            expect(topic).toHaveProperty("description", expect.any(String) )
           })
        })
    })
})
