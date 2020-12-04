const db = require("../../config/db")

module.exports = {
    findUserName() {
        const query = `
        SELECT name FROM users
        `

        return db.query(query)
    },

    create(data) {
        const query = `
            INSERT INTO users (
                name,
                password
            )VALUES ($1, $2)
            RETURNING id
        `

        const values = [
            data.name,
            data.password,
        ]

        return db.query(query, values)
    },

    userDetails(name) {
        return db.query(`SELECT * FROM users WHERE name = $1`, [name])
    }
}