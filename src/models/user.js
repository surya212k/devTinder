const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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


userSchema.methods.getJWT = async function(){

    const user = this

    const token = await jwt.sign({_id: user._id}, "DEvtinder@", {expiresIn:"7d"})

    return token

}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this

    const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)

    return isPasswordValid
}

module.exports = mongoose.model("User", userSchema)