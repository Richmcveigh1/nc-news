const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const { getEndpoints } = require("./controllers/api.controller");
const { getArticleFromID, getAllArticles } = require("./controllers/articles.controller");
const { getAllCommentsForArticleFromID } = require("./controllers/comments.controller")
const { handle400s, handle404s, customErrorHandler } = require("./controllers/errors.controller");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticleFromID);

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:article_id/comments", getAllCommentsForArticleFromID)

app.use((_, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use(handle400s);

app.use(handle404s)

app.use(customErrorHandler)

app.use((err, _, res, next) => {
  console.log(err, '<< error handler in app')
  res.status(500).send({ msg: err });
});

module.exports = app;
