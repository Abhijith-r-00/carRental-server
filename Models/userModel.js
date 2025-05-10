const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    licenseNumber:{
        type:String
    }
})

const users=mongoose.model("users",userSchema)

module.exports =users