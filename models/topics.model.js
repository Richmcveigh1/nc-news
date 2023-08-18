const db = require("../db/connection");

exports.selectTopics = async () => {
  
    const result = await db.query("SELECT * FROM topics");
    return result.rows;
  } 
  


