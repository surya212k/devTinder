const express = require('express');
const {connectDB} = require("./config/database")
const User = require("./models/user")
require('dotenv').config()
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")


const app = express()   

app.use(express.json())


app.post("/signup", async (req, res)=>{
    try{
        
        const {firstName, lastName, emailId, password} = req.body

        validateSignUpData(req)

        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })  
        await user.save()
        res.send("User added successfully")
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
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


app.patch("/user/:userId", async(req, res)=>{
    const id = req.params.userId
    const data = req.body
    console.log(id)
    console.log(data)
    try{
        const allowedUpdates = ["age", "gender", "skills", "about"]
        const isAllowedUpdate = Object.keys(data).every((k)=>{
            return allowedUpdates.includes(k)
        })
        console.log(isAllowedUpdate)
        if(!isAllowedUpdate){
            return res.status(400).send("Invalid updates")
        }
        if(data?.skills.length > 2){
            return res.status(400).send("Invalid updates")
        }
        const users = await User.findByIdAndUpdate({_id:id}, data, {runValidators: true})
        if(!users){
            res.status(400).send("user not found")
        }else{
            res.send("User updated successfully")
        }
    }catch(err){
        res.status(400).send("Something went wrong"+err.message)
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



