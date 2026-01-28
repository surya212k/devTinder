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
        const users = await User.findOne({emailId: userEmail})
        if(users.length === 0){
            res.send("User not found")
        }else{
            res.send(users)
        }
    }catch(err){
        res.status(400).send("Something went wrong")
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

app.get("/userId", async (req, res)=>{
    const id = req.body.userId

    try{
        const users = await User.findById(id)
        if(!users){
            res.status(404).send("User not found")
        }else{
            res.send(users)
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})


app.delete("/user", async(req, res)=>{
    const id = req.body.userId

    try{
        const users = await User.findByIdAndDelete(id)
        if(!users){
            res.status(400).send("User not found")
        }else{
            res.send("User deleted successfully")
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }   
})


app.patch("/user", async(req, res)=>{
    const email = req.body.emailId
    const data = req.body
    try{
        const users = await User.updateOne({emailId: email}, data)
        if(!users){
            res.status(400).send("user not found")
        }else{
            res.send("User updated successfully")
        }
    }catch(err){
        res.status(400).send("Something went wrong")
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



