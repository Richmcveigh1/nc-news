const db = require("../db/connection");

exports.selectArticleWithID = (article_id) => {
  return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
};
