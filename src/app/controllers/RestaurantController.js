const User = require("../models/User")
const Restaurant = require("../models/Restaurant")

module.exports = {
    async postUser(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        const usersName = await User.findUserName()

        for(let i = 0; i < usersName.rows.length; i ++) {
            if(req.body.name == usersName.rows[i].name) {
                return res.send("Username in use")
            }
        }

        try {
            let results = await User.create(req.body)
            const productId = results.rows[0].id

            return res.render("register-restaurant", { productId })
        } catch(err) {
            console.log(err)
        }
    },

    async postRestaurant(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        try{
            let results = await Restaurant.create(req.body)
            const restaurantId = results.rows[0].id

            return res.render("register-tables", { restaurantId })
        } catch(err){
            console.log(err)
        }
    },

    async postRestaurantTables(req, res) {
        const keys = Object.keys(req.body)

        const restaurantId = req.body.restaurant_id

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        try{
            await Restaurant.createPlaces(req.body)
        } catch(err){
            console.log(err)
        }

        return res.render("register-tables", { restaurantId })
    },

    async getUser(req, res) {
        let aux = 0
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        const usersName = await User.findUserName()

        for(let i = 0; i < usersName.rows.length; i ++) {
            if(req.body.name == usersName.rows[i].name) {
                aux = aux + 1
            }
        }

        if(aux != 1) {
            return res.send("User not exist")
        } else {
            try {
                let results = await User.userDetails(req.body.name)
                const userDetails = results.rows[0]

                if(req.body.password != userDetails.password) {
                    return res.send("Senha invalida")
                } else {
                    let restaurantId = await Restaurant.getRestaurantId(userDetails.id)

                    const tables = await Restaurant.getTables(restaurantId.rows[0].id)

                    return res.render("restaurant-table", { tables: tables.rows })
                }
    
            } catch(err) {
                console.log(err)
            }
        }
    },

    async searchRestaurantes(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        try{
            console.log(req.body.city)
            let results = await Restaurant.searchRestaurants(req.body.city)
            console.log("aquiiii")
            const restaurants = results.rows
            console.log(restaurants)
            
            return res.render("restaurants", { restaurants })
        } catch(err){
            console.log(err)
        }
    },

    async searchRestaurantesMenu(req, res) {
        try{
            let results = await Restaurant.searchRestaurantsMenu(req.params.id)
            const menus = results.rows[0].menu
            
            return res.render("restaurants-menu", { menus,  id: req.params.id })
        } catch(err){
            console.log(err) 
        }
    },

    async reservedTable(req, res) {
        try{
            let results = await Restaurant.getTables(req.params.id)
            const tables = results.rows
            
            return res.render("reserved-table", { tables })
        } catch(err){
            console.log(err) 
        }

    },

    async postReservedTable(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if(req.body[key] == "") {
                return res.send("Please, fill all fields!")
            }
        }

        await Restaurant.update(req.body)

        return res.redirect('/')
    },

    async postFreeTable(req, res) {
        const result = await Restaurant.freeTable(req.body.tableId)

        console.log(result)

        const tables = await Restaurant.getTables(req.body.restauranteId)

        console.log(tables.rows)
        console.log(req.body.tableId)

        return res.render("restaurant-table", { tables: tables.rows })
    }
}