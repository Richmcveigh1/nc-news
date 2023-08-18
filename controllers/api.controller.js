const { readAllEndpoints } = require("../models/api.model");

exports.getEndpoints = async (req, res) => {
  try {
    const endpoints = await readAllEndpoints();
    res.status(200).send({ endpoints });
  } catch(err) {
    next(err);
  }
};
