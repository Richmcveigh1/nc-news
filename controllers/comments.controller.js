const { selectAllCommentsFromArticleID } = require("../models/comments.model");
const { checkExists } = require("../utils");

exports.getAllCommentsForArticleFromID = (req, res, next) => {
  const { article_id } = req.params;

  const promises = [selectAllCommentsFromArticleID(article_id)];

  if (article_id) {
    promises.push(checkExists("articles", "article_id", article_id));
  }

  Promise.all(promises)
    .then(([allComments, commentsExist]) => {
      const commentsArray = allComments.rows;
      res.status(200).send(commentsArray);
    })
    .catch(next);
};
