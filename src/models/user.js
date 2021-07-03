const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.DB_USER, {useNewUrlParser : true, useUnifiedTopology: true})

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    }
})

module.exports = User