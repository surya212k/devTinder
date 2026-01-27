const express = require('express');
const {connectDB} = require("./config/database")
const User = require("./models/user")

const { adminAuth, userAuth } = require("./middlewares/auth")


const app = express()   


app.post("/signup", async (req, res)=>{
    const userDetails = {
        firstName: "AjithKumar",
        lastName: "Singh",
        emailId:"ajithkumar4907@hotmail.com",
        password:"ajithkumar2012",
        age:26,
        gender:"Male"
    }

    const user = new User(userDetails)  
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



