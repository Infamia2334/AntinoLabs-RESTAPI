
const mongoose = require("mongoose")


const Product = mongoose.model('store', {
    _id: {
        type:Number,
        required:true,
        unique: true
    },

    name: {
        type: String,
        required: true

    }, 
    price: {
        type: Number,
        required: true
    }
})

module.exports = Product