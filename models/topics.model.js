const db = require("../db/connection");

exports.selectTopics = async () => {
  try {
    const result = await db.query("SELECT * FROM topics");
    return result.rows;
  } catch (err) {
    throw err;
  }
};

