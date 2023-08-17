const { selectTopics } = require("../models/topics.model");

exports.getTopics = async (req, res) => {
  try {
    const topics = await selectTopics();
    res.status(200).send({ topics });
  } catch (err) {
    next(err);
  }
};
