const { all } = require("../app");
const {
  selectAllCommentsFromArticleID,
  addComment,
} = require("../models/comments.model");
const { checkExists } = require("../utils");

exports.getAllCommentsForArticleFromID = async (req, res, next) => {
  const { article_id } = req.params;

  const promises = [selectAllCommentsFromArticleID(article_id)];

  if (article_id) {
    promises.push(checkExists("articles", "article_id", article_id));
  }

  try {
    const [allComments, commentsExist] = await Promise.all(promises);
    const commentsArray = allComments.rows;
    res.status(200).send(commentsArray);
  } catch (err) {
    next(err);
  }
};

exports.postCommentWithArticleID = async (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  try {
    await checkExists("articles", "article_id", article_id);
    const comment = await addComment(article_id, username, body);
    res.status(201).send(comment);
  } catch (err) {
    next(err);
  }
};
