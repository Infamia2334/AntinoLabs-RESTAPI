const express = require("express")
const router = express.Router()




const User = require("../models/user")


router.post('/', (req, res)=>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        res.status(400)
        res.send(err)
    })

})

router.post("/login", (req, res)=>{
    const user = User.findByCredentials(req.body.email, req.body.password)
})

module.exports = router