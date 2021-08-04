require("dotenv").config()
const express = require("express")
const cors = require("cors")
const compression = require("compression")

const app = express()
const router = express.Router()

//Imports Route Files
const AuthRoutes = require('./Routes/Auth.Routes')(router)
const BookRoutes = require("./Routes/Book.Routes")(router)

app.use(compression())
app.use(express.urlencoded())
app.use(express.json())


app.use('/api/', AuthRoutes)
app.use('/api/', BookRoutes)

app.listen(process.env.PORT, ()=>{
    console.log("Server Listening on port %s",process.env.PORT)
})