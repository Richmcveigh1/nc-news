const { all } = require("../app");
const {
  selectAllCommentsFromArticleID,
  addComment,
  removeComment,
} = require("../models/comments.model");
const { checkExists } = require("../utils");

exports.getAllCommentsForArticleFromID = async (req, res, next) => {
  const { article_id } = req.params;

  const promises = [selectAllCommentsFromArticleID(article_id)];

  if (article_id) {
    promises.push(checkExists("articles", "article_id", article_id));
  }

  try {
    const [allComments, _] = await Promise.all(promises);
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
    const commentArray = await addComment(article_id, username, body);
    const comment = commentArray.rows[0];
    res.status(201).send(comment);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  const { comment_id } = req.params;

  try {
    const commentArray = await removeComment(comment_id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
