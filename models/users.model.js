const db = require("../db/connection");

exports.retrieveAllUsers =  async () => {
    try {
        result = await db.query(`
        SELECT * FROM users
        `)
        return result
    }
    catch(err) {
        throw err
    }
}