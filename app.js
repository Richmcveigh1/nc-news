const cors = require("cors");
const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const { getEndpoints } = require("./controllers/api.controller");
const {
  getArticleFromID,
  getAllArticles,
  patchArticleWithVotes,
} = require("./controllers/articles.controller");
const {
  getAllCommentsForArticleFromID,
  postCommentWithArticleID,
  deleteComment,
} = require("./controllers/comments.controller");
const { getAllUsers } = require("./controllers/users.controller");
const {
  handle400s,
  handle404s,
  customErrorHandler,
} = require("./controllers/errors.controller");

app.use(cors());

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticleFromID);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getAllCommentsForArticleFromID);

app.post("/api/articles/:article_id/comments", postCommentWithArticleID);

app.patch("/api/articles/:article_id", patchArticleWithVotes);

app.delete("/api/comments/:comment_id", deleteComment);

app.get("/api/users", getAllUsers);

app.use((_, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use(handle404s);

app.use(handle400s);

app.use(customErrorHandler);

app.use((err, _, res, next) => {
  console.log(err, "<< error handler in app");
  res.status(500).send({ msg: err });
});

module.exports = app;
