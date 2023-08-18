const fs = require("fs/promises");

exports.readAllEndpoints = async () => {
  try {
    const data = await fs.readFile("./endpoints.json", "utf-8");
    const endpoints = JSON.parse(data);
    return endpoints;
  } catch (err) {
    throw err;
  }
};
