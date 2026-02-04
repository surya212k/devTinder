const validator = require("validator")


const validateSignUpData = (req) =>{
    
    const {emailId, password } = req.body

    if(!validator.isEmail(emailId)){
        throw new Error("Not a valid email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password")
    }

}

module.exports = {
    validateSignUpData,
}