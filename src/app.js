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

app.get("/user", async (req, res) =>{
    const userEmail = req.body.emailId

    try{
        const email = await User.findOne({emailId: userEmail})
        if(email.length === 0){
            res.send("User not found")
        }else{
            res.send(email)
        }
    }catch(err){
        res.status(500).send("Something went wrong")
    }
})

app.get("/feed", async (req, res)=>{

    try{
        const users = await User.find({})
        res.send(users)
    }catch(err){
        res.status(500).send("Something went wrong")
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



