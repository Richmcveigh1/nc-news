exports.handle400s = (err, _, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};

exports.handle404s = (err, _, res, next) => {
    if (err.code === '22003') {
        res.status(404).send({msg: "Not found"})
    }
    else next(err)
}

exports.customErrorHandler = (err, req, res, next) => {
    if(err.status && err.msg) {
    res.status(err.status).send(err.msg)
    } else next(err)
}