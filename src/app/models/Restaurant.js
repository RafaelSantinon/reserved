const db = require("../../config/db")

module.exports = {
    create(data) {
        const query = `
            INSERT INTO restaurants (
                name,
                description,
                schedule,
                city,
                street,
                location,
                cep,
                menu,
                user_id
            )VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `

        const values = [
            data.name,
            data.description,
            data.schedule,
            data.city,
            data.street,
            data.location,
            data.cep,
            data.menu,
            data.user_id,
        ]

        return db.query(query, values)
    },

    createPlaces(data) {
        const query = `
            INSERT INTO places (
                number,
                seats,
                restaurant_id
            )VALUES ($1, $2, $3)
        `

        const values = [
            data.number,
            data.seats,
            data.restaurant_id,
        ]

        return db.query(query, values)
    },

    searchRestaurants(city) {
        return db.query(`SELECT * FROM restaurants WHERE city = $1`, [city])
    },

    searchRestaurantsMenu(id) {
        return db.query(`SELECT menu FROM restaurants WHERE id = $1`, [id])
    },

    getRestaurantId(userId) {
        return db.query(`SELECT id FROM restaurants WHERE user_id = $1`, [userId])
    },

    getTables(restaurantId) {
        return db.query(`SELECT * FROM places WHERE restaurant_id = $1 ORDER by id`, [restaurantId])
    },

    findTable(tableId) {
        return db.query(`SELECT * FROM places WHERE id = $1`, [tableId])
    },

    update(data) {
        const query = `
            UPDATE places SET
                user_reserved=($1)
            WHERE id = $2
        `

        const values = [
            data.nameReserved,
            data.tableId
        ]

        return db.query(query, values)
    },

    freeTable(data) {
        const query = `
            UPDATE places SET
                user_reserved=($1)
            WHERE id = $2
        `

        const values = [
            null,
            data
        ]


        console.log(values)
        console.log(db.query(query, values))

        return db.query(query, values)
    }
}