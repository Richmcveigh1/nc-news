const fs = require("fs/promises");


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
