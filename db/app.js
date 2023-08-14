const express = require("express");
const app = express();
const { getHealthCheck } = require('../controllers/healthcheck.controller');
const { getTopics } = require('../controllers/topics.controller')

app.use(express.json());

app.get("/api/healthcheck", getHealthCheck);

app.get('/api/topics', getTopics)

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: err });
});

module.exports = app;
