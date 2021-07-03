require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
// const path = require("path")

mongoose.connect(process.env.DB_URL, {useNewUrlParser : true, useUnifiedTopology: true})

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())


const db = mongoose.connection
db.on("error", ()=>console.log(err))
db.once("open", ()=>console.log("Connection to monogDB successful"))

const userRoute =  require("./routers/user")
const storeRoute = require("./routers/store")

app.use("/users", userRoute)
app.use("/store", storeRoute)

app.listen(port, ()=> console.log(`Listening on port ${port}`))