const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:4,
        trim:true,
    },
    lastName:{
        type: String,
        trim:true
    },
    emailId:{
        type:String,
        unique:true,
        required: true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password:{
        type:String,
        required: true,
        minLength:6,
        trim:true,
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
    },
    photoURL:{
        type:String,
        default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
        
    },
    about:{
        type:String,
        default:"This is the default about for the user"
    },
    skills:{
        type:[String]
    }
}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)