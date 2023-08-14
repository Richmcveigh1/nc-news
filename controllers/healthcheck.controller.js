exports.getHealthCheck = (req, res) => {
  res.status(200).send({ msg: "Connected to server" });
};



