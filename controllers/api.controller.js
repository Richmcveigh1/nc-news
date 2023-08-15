const { readAllEndpoints } = require("../models/api.model");

exports.getEndpoints = (req, res) => {
  readAllEndpoints().then((endpoints) => {
    res.status(200).send({ endpoints });
  });
};