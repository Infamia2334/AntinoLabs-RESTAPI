const express = require("express")
const router = express.Router()


const Product = require("../models/product")

router.get('/', (req, res)=>{
    Product.find((err, result)=>{
        if(!err)
            res.send(result)

        else{
            console.log(err)
        }
    })
})
//Getting product by ID
router.get('/:id', (req, res)=>{
    Product.findOne({_id: req.params.id},(err, found)=>{
        if(!err){
            res.send(found)
        }
        else{
            res.send(err)
        }
    })

})



//Creating new Products
router.post("/", (req, res)=>{
    const product = new Product(req.body)

    product.save().then(()=>{

        res.status(201).send(product)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

//Updating Product Details
router.patch("/:id", (req, res)=>{
    Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, found)=>{
        if(!err){
            res.status(200).send(found)
        }
        else{
            res.status(400).send(err)
        }
    })
})

//Deleting Products
router.delete("/:id", (req, res)=>{
    Product.findOneAndDelete({_id: req.params.id}, (err)=>{
        if(!err){
            res.status(200).send("deleted")
        }
        else{
            res.status(400).send(err)
        }
    })
})


module.exports = router