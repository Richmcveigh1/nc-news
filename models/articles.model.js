const db = require("../db/connection");

exports.selectArticleWithID = async (article_id) => {
  const results = await db.query(
    "SELECT * FROM articles WHERE article_id = $1",
    [article_id]
  );
  return results;
};

exports.selectAllArticles = async (
  topic,
  sort_by = "created_at",
  order = "DESC"
) => {
  allowedColumns = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
  ];

  const queryValues = [];

  if (order !== "DESC" && order !== "ASC") {
    const error = { status: 400, msg: "Bad Request" };
    throw error;
  }

  if (!allowedColumns.includes(sort_by)) {
    const error = { status: 400, msg: "Bad Request" };
    throw error;
  }

  let sqlString = `
  SELECT 
  articles.author, 
  articles.title, 
  articles.article_id, 
  articles.topic, 
  articles.created_at, 
  articles.votes, 
  articles.article_img_url, 
  COUNT(comments.comment_id) AS comment_count 
  FROM articles
  LEFT JOIN comments ON articles.article_id = comments.article_id
  `;
  if (topic) {
    sqlString += `WHERE topic = $1 `;
    queryValues.push(topic);
  }

  if (sort_by && order) {
    sqlString += `GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order}`;
  }

  const result = await db.query(sqlString, queryValues);
  return result;
};

exports.changeVotesFromArticleID = async (inc_votes, article_id) => {
  const result = await db.query(
    `
  UPDATE articles
  SET votes = votes + $1
  WHERE article_id = $2
  RETURNING *
  `,
    [inc_votes, article_id]
  );
  return result;
};
