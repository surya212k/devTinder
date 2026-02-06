const express = require('express');
const {connectDB} = require("./config/database")
const User = require("./models/user")
require('dotenv').config()
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")

const app = express()   

app.use(express.json())
app.use(cookieParser())


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

app.post("/login", async (req, res) =>{

    try{

        const {emailId, password} = req.body
        
        const user = await User.findOne({emailId: emailId})
        
        if(!user){
            throw new Error("Invalid credentials")
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if(isPasswordValid){

            const _id = {_id: user._id}

            const token = jwt.sign(_id, "DEvtinder@")

            res.cookie("token",token)

            res.send("Login successful")
        }
        else{
            throw new Error("Invalid credentials")
        }
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
        
})

app.get("/profile", userAuth, async(req, res)=>{
    try{
        const user = req.user
        
        res.send(user)
    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
    
})

app.post("/sendConnectionRequest", userAuth, async(req, res)=>{
    try{
        const user = req.user

        res.send(user.firstName + " sent the connection request")

    }catch(err){
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



