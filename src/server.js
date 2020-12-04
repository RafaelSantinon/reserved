const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const methodOverride = require("method-override")

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(methodOverride("_method"))
app.use(routes)

app.set("view engine", "njk")

nunjucks.configure("src/app/view", {
    express:app,
    autoescape: false,
    noCache: true
})

app.listen(5000, function() {
    console.log("server is running")
})