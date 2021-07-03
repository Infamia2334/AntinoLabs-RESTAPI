
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
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
    //Very sorry for storing plain text passwords in DB, I will fix it I promise
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "User",
        required: true,
        enum: ["Admin", "User"]
    }
})

// userSchema.methods.generateAuthToken

userSchema.statics.findByCredentials = (email, password)=>{
    const user = User.findOne({email: email})
    if(!user){
        throw new Error("Unable to login")
    }
    
    const matchPassword = bcrypt.compare(password, user.password)
    if(!matchPassword){
        throw new Error ("Unable to login")
    }
    return user
    }
// userSchema.pre("save", function(next){
//     const user = this

//     next()
// })

const User = mongoose.model("User", userSchema)

module.exports = User