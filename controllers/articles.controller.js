const {
  selectArticleWithID,
  selectAllArticles,
  changeVotesFromArticleID,
} = require("../models/articles.model");
const { checkExists } = require("../utils");

exports.getArticleFromID = async (req, res, next) => {
  const { article_id } = req.params;

  try {
    const articleFromID = await selectArticleWithID(article_id);
    const article = articleFromID.rows[0];
    if (!article) {
      return Promise.reject({
        status: 404,
        msg: "Not found",
      });
    }

    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.getAllArticles = async (req, res, next) => {
        
  try {
    const articles = await selectAllArticles();
    const articlesArray = articles.rows;
    res.status(200).send(articlesArray);
  } catch (err) {
    next(err);
  }
};

exports.getAllCommentsForArticleFromID = async (req, res, next) => {
  const { article_id } = req.params;

  try {
    const comentsFromID = await selectAllCommentsFromArticleID(article_id);
    const commentsArray = commentsFromID.rows;
    res.status(200).send(commentsArray);
  } catch (err) {
    next(err);
  }
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
