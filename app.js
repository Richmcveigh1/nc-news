const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const { getEndpoints } = require("./controllers/api.controller");
const { getArticleFromID, getAllArticles, getAllCommentsForArticleFromID } = require("./controllers/articles.controller");
const { handle400s, customErrorHandler } = require("./controllers/errors.controller");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticleFromID);

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:article_id/comments", getAllCommentsForArticleFromID)

app.use((_, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use(handle400s);

app.use(customErrorHandler)

app.use((err, _, res, next) => {
  res.status(500).send({ msg: err });
});

module.exports = app;
