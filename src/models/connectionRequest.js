const mongoose = require("mongoose")



const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Types.ObjectId,
        required: true
    },
    toUserId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:'{VALUE} is not supported'
        }
    }
},{
    timestamps:true
})

connectionRequestSchema.pre("save", function(next){
     const connectionRequest = this

     if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send connection request to yourself")
     }
     next()
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema)