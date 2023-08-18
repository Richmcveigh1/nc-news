const fs = require("fs/promises");

exports.readAllEndpoints = async () => {
  const data = await fs.readFile("./endpoints.json", "utf-8");
  const endpoints = JSON.parse(data);
  return endpoints;
};
