const express = require("express");
const app = express();
const { getTopics } = require('../controllers/topics.controller')


app.get('/api/topics', getTopics)

app.use((err, req, res, next) => {
  res.status(500).send({ msg: err });
});

module.exports = app;
