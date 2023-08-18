const db = require("../db/connection");

exports.retrieveAllUsers = async () => {
  result = await db.query(`
        SELECT * FROM users
        `);
  return result;
};
