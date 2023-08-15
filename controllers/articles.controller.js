const { selectArticleWithID } = require("../models/articles.model")

exports.getArticleFromID = ((req, res, next) => {
    const { article_id } = req.params
    selectArticleWithID(article_id).then((articleFromID) => {
        const article = articleFromID.rows[0]
        if (!article) {
            return Promise.reject({
                status: 404,
                msg: "Not found"
            })
        }
        res.status(200).send({article})
    })
    .catch(next)
})