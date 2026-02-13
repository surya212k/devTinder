const express = require('express')
const profileRouter = express.Router()
const {userAuth} = require("../middlewares/auth")
const{validateProfileUpdate} = require("../utils/validation")
const bcrypt = require("bcrypt")


profileRouter.get("/profile", userAuth, async(req, res)=>{
    try{
        const user = req.user
        
        res.send(user)
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
    
})


profileRouter.patch("/profile/edit", userAuth, async(req, res)=>{
    try{
        
        if(!validateProfileUpdate(req)){
            throw new Error("Invalid update!")
        }

        const loggedInUser = req.user
        

        Object.keys(req.body).forEach((key)=> (loggedInUser[key] = req.body[key]))

        await loggedInUser.save()
        

        res.send({message:`${loggedInUser.firstName} your profile updated successfully`,
            data: loggedInUser,
        })
    }catch(err){
        res.status(400).send("ERROR "+ err.message)
    }
})


profileRouter.patch("/profile/password", userAuth, async (req, res)=>{
        try{

            const {currentPassword, changePassword} = req.body

            const user = req.user
            
            const isCurrentValid = await bcrypt.compare(currentPassword, user.password)

            if(!isCurrentValid){
                throw new Error("current password was wrong!!!")
            }

            const passwordHash = await bcrypt.hash(changePassword, 10)

            user.password = passwordHash

            await user.save()

            res.send("password changed successfully")


        }catch(err){
            res.status(400).send("ERROR "+ err.message)
        }

})


module.exports = profileRouter