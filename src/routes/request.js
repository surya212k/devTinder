const express = require('express')
const requestRouter = express.Router()
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const user = require('../models/user')


requestRouter.post("/request/send/:status/:userId", userAuth, async(req, res)=>{
    try{
        const fromUserId = req.user._id
        const toUserId = req.params.userId
        const status = req.params.status

        const allowedStatus = status.includes("interested", "ignored")

        if(!allowedStatus){
            return res.status(404).send("Invalid status!!")
        }

        
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        const existingConnection = await ConnectionRequest.findOne({
            $or:[
                {
                    fromUserId,
                    toUserId
                },
                {
                    fromUserId: toUserId,
                    toUserId: fromUserId
                }
            ]
        })
        if(existingConnection){
            return res.status(400).send("Connection already exists!")
        }

        const toUser = await user.findById(toUserId)

        if(!toUser){
            return res.status(404).send("User not found")
        }

        const data = await connectionRequest.save()

        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data
        })

    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})


module.exports = requestRouter