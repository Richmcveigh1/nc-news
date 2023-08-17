const {
  selectArticleWithID,
  selectAllArticles,
  changeVotesFromArticleID,
} = require("../models/articles.model");
const { checkExists } = require("../utils");

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
  selectAllArticles()
    .then((articles) => {
      const articlesArray = articles.rows;
      res.status(200).send(articlesArray);
    })
    .catch(next);
};

exports.getAllCommentsForArticleFromID = (req, res, next) => {
  const { article_id } = req.params;
  selectAllCommentsFromArticleID(article_id)
    .then((commentsFromID) => {
      const commentsArray = commentsFromID.rows;
      res.status(200).send(commentsArray);
    })
    .catch(next);
};

exports.patchArticleWithVotes = async (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  try {
    await checkExists("articles", "article_id", article_id);
    const update = await changeVotesFromArticleID(inc_votes, article_id);
    const updatedArticle = update.rows[0];
    res.status(200).send(updatedArticle);
  } catch (err) {
    next(err);
  }
};
