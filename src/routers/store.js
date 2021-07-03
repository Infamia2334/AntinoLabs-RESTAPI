const express = require("express")
const router = express.Router()


const Product = require("../models/product")

router.post("/", (req, res)=>{
    const product = new Product(req.body)

    product.save().then(()=>{
        res.send(product)
    }).catch((err)=>{
        res.status(400)
        res.send(err)
    })
})

module.exports = router