const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const endpointsJSON = require("../endpoints.json");

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
        const { topics } = res.body;
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toHaveProperty("slug", expect.any(String));
          expect(topic).toHaveProperty("description", expect.any(String));
        });
      });
  });
});

describe("GET/api", () => {
  test("200: responds with all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const { endpoints } = res.body;
        expect(endpoints).toEqual(endpointsJSON);
      });
  });
});

describe("GET/api/articles/:article_id", () => {
  test("200: responds with an object corresponding to the article ID requested", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        const { article } = res.body;
        expect(article.article_id).toBe(1);
        expect(article).toHaveProperty("title", expect.any(String));
        expect(article).toHaveProperty("topic", expect.any(String));
        expect(article).toHaveProperty("author", expect.any(String));
        expect(article).toHaveProperty("body", expect.any(String));
        expect(article).toHaveProperty("created_at", expect.any(String));
        expect(article).toHaveProperty("votes", expect.any(Number));
        expect(article).toHaveProperty("article_img_url", expect.any(String));
      });
  });
  test("400: When the article_id doesn't exist it sends an error message", () => {
    return request(app)
      .get("/api/articles/uh-oh")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request");
      });
  });
  test("404: When the request is a number but the article_id doesn't exist it replies with an error message", () => {
    return request(app)
      .get("/api/articles/1234567890")
      .expect(404)
      .then((res) => {
        expect(res.text).toBe("Not found");
      });
  });
});

describe("Get/api/articles", () => {
  test("200: responds with an array containing all of the articles as objects including a comment count and without a body property", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        const articles = res.body;
        expect(articles.length).toBe(13);
        expect(articles).toBeSortedBy("created_at", { descending: true });
        articles.forEach((article) => {
          expect(article).toHaveProperty("author", expect.any(String));
          expect(article).toHaveProperty("title", expect.any(String));
          expect(article).toHaveProperty("article_id", expect.any(Number));
          expect(article).toHaveProperty("topic", expect.any(String));
          expect(article).toHaveProperty("created_at", expect.any(String));
          expect(article).toHaveProperty("votes", expect.any(Number));
          expect(article).toHaveProperty("article_img_url", expect.any(String));
          expect(article).toHaveProperty("comment_count", expect.any(String));
        });
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("200: responds with an array of comments relating to the requested article id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        const comments = res.body;
        expect(comments.length).toBe(11);
        expect(comments).toBeSortedBy("created_at", { descending: true });
        comments.forEach((comment) => {
          expect(comment).toHaveProperty("comment_id", expect.any(Number));
          expect(comment).toHaveProperty("votes", expect.any(Number));
          expect(comment).toHaveProperty("created_at", expect.any(String));
          expect(comment).toHaveProperty("author", expect.any(String));
          expect(comment).toHaveProperty("body", expect.any(String));
          expect(comment).toHaveProperty("article_id", expect.any(Number));
        });
      });
  });
  test("200: responds with an empty array if the id exists but there are no comments for that article", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((res) => {
        const comments = res.body;
        expect(comments).toEqual([]);
      });
  });
  test("400: When the article_id doesn't exist it sends an error message", () => {
    return request(app)
      .get("/api/articles/WhoopsyDaisy/comments")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request");
      });
  });
  test("404: When the request is a number but the article_id doesn't exist it replies with an error message", () => {
    return request(app)
      .get("/api/articles/1111/comments")
      .expect(404)
      .then(({ error }) => {
        const { text } = error;
        expect(text).toBe("Not found");
      });
  });
  test("404: When the request is a number out of the range it replies with Not found", () => {
    return request(app)
      .get("/api/articles/11111111111111111111/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("201: posts a comment to the article on the correct id", () => {
    const testComment = {
      username: "butter_bridge",
      body: "testing",
    };

    return request(app)
      .post("/api/articles/1/comments")
      .send(testComment)
      .expect(201)
      .then((res) => {
        const newComment = res.body;
        expect(newComment).toHaveProperty("comment_id", 19);
        expect(newComment).toHaveProperty("body", "testing");
        expect(newComment).toHaveProperty("article_id", 1);
        expect(newComment).toHaveProperty("author", "butter_bridge");
        expect(newComment).toHaveProperty("votes", 0);
        expect(newComment).toHaveProperty("created_at", expect.any(String));
      });
  });
  test("400: Responds with a bad request when trying to post a comment with nothing in the column when it is marked as NOT NULL", () => {
    const testComment = {
      username: null,
      body: "testing",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(testComment)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request");
      });
  });
  test("400: Responds with a bad request when trying to post a comment from a user that does not exist", () => {
    const testComment = {
      username: "Test User",
      body: "testing",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(testComment)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request");
      });
  });
  test("400: Responds with a bad request when trying to post a comment where the user name is not a string", () => {
    const testComment = {
      username: 25,
      body: 25,
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(testComment)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request");
      });
  });
  test("404: responds with Not found if trying to post to an article ID that doesn't exist", () => {
      const testComment = {
          username: "butter_bridge",
          body: "testing",
        };
        
        return request(app)
        .post("/api/articles/999/comments")
        .send(testComment)
        .expect(404)
        .then(({ error }) => {
            const { text } = error;
            expect(text).toBe("Not found");
          });
    });
})

describe("/api/articles/:article_id", () => {
    test("200: patches the votes on the article idto change the number")
})

describe("ALL /notapath", () => {
  test("404: responds with a custom 404 error message when the path is not found", () => {
    return request(app)
      .get("/api/anything")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Not found");
      });
  });
});
