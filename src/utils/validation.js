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

const validateProfileUpdate = (req) =>{
    
    
    const allowedFields = [
        "firstName",
        "lastName",
        "emailId",
        "about",
        "skills"
     ]
     
    const isAllowedUpdate = Object.keys(req.body).every((k) =>{
        return allowedFields.includes(k)
    })

    return isAllowedUpdate
    
}


module.exports = {
    validateSignUpData,
    validateProfileUpdate,
}