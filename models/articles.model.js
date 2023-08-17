const db = require("../db/connection");

exports.selectArticleWithID = (article_id) => {
  return db.query("SELECT * FROM articles WHERE article_id = $1", [article_id]);
};

exports.selectAllArticles = () => {
  return db.query(
    `
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
    GROUP BY articles.article_id
    ORDER BY created_at DESC
    `
  );
};

exports.changeVotesFromArticleID = () => {
  return db.query(`
  
  `)
}