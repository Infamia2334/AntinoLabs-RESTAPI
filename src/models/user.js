
const mongoose = require("mongoose")




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
    },
    role: {
        type: String,
        default: "User",
        required: true
    }
})

module.exports = User