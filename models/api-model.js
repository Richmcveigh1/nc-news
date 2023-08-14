const fs = require("fs/promises");
//const db = require("../db/connection");

exports.readAllEndpoints = () => {
  return fs
    .readFile("./endpoints.json", "utf-8")
    .then((data) => {
      const endpoints = JSON.parse(data);
      return endpoints;
    })
    .catch((err) => {
    });
};
