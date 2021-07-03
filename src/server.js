require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
// const path = require("path")

mongoose.connect(process.env.DB_URL, {useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true})

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())


const db = mongoose.connection
db.on("error", ()=>console.log(err))
db.once("open", ()=>console.log("Connection to monogDB successful"))

app.post("/", (req, res)=>{

    const accessToken = jwt.sign({email:req.body.email}, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null){
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err){
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

const userRoute =  require("./routers/user")
const storeRoute = require("./routers/store")

app.use("/users",authenticateToken, userRoute)
app.use("/store",authenticateToken, storeRoute)

app.listen(port, ()=> console.log(`Listening on port ${port}`))