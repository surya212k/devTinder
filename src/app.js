const express = require('express');
const {connectDB} = require("./config/database")
const User = require("./models/user")
require('dotenv').config()


const { adminAuth, userAuth } = require("./middlewares/auth")


const app = express()   

app.use(express.json())


app.post("/signup", async (req, res)=>{

    const user = new User(req.body)  
    try{
        await user.save()
        res.send("User added successfully")
    }
    catch(err){
        res.status(500).send("There is an error")
    }

})


connectDB()
.then(() =>{
    console.log("Database connected successfully")
    app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})
})
.catch((err) =>{
    console.error("database not connected")
})



