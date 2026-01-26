const mongoose = require("mongoose")


const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://root:root123@cluster0.xf1ebst.mongodb.net/devTinder")
} 

module.exports ={
    connectDB
}
