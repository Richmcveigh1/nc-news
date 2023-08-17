const { retrieveAllUsers } = require("../models/users.model")

exports.getAllUsers = async (req, res, next) => {

    try {
        const users = await retrieveAllUsers()
        const allUsers = users.rows
        res.status(200).send(allUsers)
    } catch (err) {
        next (err)
    }
}