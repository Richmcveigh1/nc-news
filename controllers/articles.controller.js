const {
  selectArticleWithID,
  selectAllArticles,
  changeVotesFromArticleID,
} = require("../models/articles.model");
const { checkExists } = require("../utils");

exports.getArticleFromID = async (req, res, next) => {
    const { article_id } = req.params

  try {
    const article = await selectArticleWithID(article_id);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.getAllArticles = async (req, res, next) => {
const {topic, sort_by, order} = req.query
const promises = [selectAllArticles(topic, sort_by, order)]

if (topic) {
  promises.push(checkExists("topics", "slug", topic))
}

  try {
    const results = await Promise.all(promises)
    const articles = results[0].rows
    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
};

exports.patchArticleWithVotes = async (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  try {
    await checkExists("articles", "article_id", article_id);
    const updatedArticle = await changeVotesFromArticleID(inc_votes, article_id);
    res.status(200).send(updatedArticle);
  } catch (err) {
    next(err);
  }
};
