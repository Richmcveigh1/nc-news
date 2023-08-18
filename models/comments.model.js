const db = require("../db/connection");

exports.selectAllCommentsFromArticleID = async (article_id) => {
  try {
    const result = await db.query(
      `
        SELECT
        comment_id,
        votes,
        created_at,
        author,
        body,
        article_id
        FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC
        `,
      [article_id]
    );
    return result;
  } catch (err) {
    throw err;
  }
};

exports.addComment = async (article_id, username, body) => {
  try {
    const result = await db.query(
      `
    INSERT INTO comments
    (author, body, article_id)
    VALUES
    ($1, $2, $3)
    RETURNING *`,
      [username, body, article_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

exports.removeComment = async (comment_id) => {
  try {
    const result = await db.query(
      `
        DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *
        `,
      [comment_id]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};
