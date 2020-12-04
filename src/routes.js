const express = require("express")
const routes = express.Router()
const RestaurantController = require("./app/controllers/RestaurantController")

routes.get('/', (req, res) => {
    res.render("index.njk")
})

routes.get('/register', (req, res) => {
    res.render("register.njk")
})

routes.get('/login', (req, res) => {
    res.render("login.njk")
})

routes.post('/create-login', RestaurantController.postUser)

routes.post('/create-restaurant', RestaurantController.postRestaurant)

routes.post('/create-restaurant-tables', RestaurantController.postRestaurantTables)

routes.post('/login', RestaurantController.getUser)

routes.post('/search-restaurants', RestaurantController.searchRestaurantes)

routes.get('/restaurant-menu/:id', RestaurantController.searchRestaurantesMenu)

routes.get('/reserved-table/:id', RestaurantController.reservedTable)

routes.put('/reserved-table', RestaurantController.postReservedTable)

routes.put('/free-table', RestaurantController.postFreeTable)

module.exports = routes 