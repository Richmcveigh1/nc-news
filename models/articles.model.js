const db = require("../db/connection");

exports.selectArticleWithID = async (article_id) => {
  const articleFromID = await db.query(
`
    SELECT
      articles.author,
      articles.title,
      articles.article_id,
      articles.topic,
      articles.body,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id
    `,
    [article_id]
  );

  if (articleFromID.rowCount === 0) {
    const brokenPromise = await Promise.reject({ status: 404, msg: "Not found" })
     return brokenPromise
    }
  return articleFromID.rows[0];
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
  return result.rows[0];
};
