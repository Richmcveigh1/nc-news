const {
  selectArticleWithID,
  selectAllArticles,
} = require("../models/articles.model");

exports.getArticleFromID = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleWithID(article_id)
    .then((articleFromID) => {
      const article = articleFromID.rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "Not found",
        });
      }
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  selectAllArticles().then((articles) => {
    const articlesArray = articles.rows;
    res.status(200).send(articlesArray);
  });
};

exports.getAllCommentsForArticleFromID = (req, res, next) => {
    const { article_id } = req.params;
    selectAllCommentsFromArticleID(article_id).then((commentsFromID) => {
        commentsArray = commentsFromID.rows
    })
}