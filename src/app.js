const express = require('express');
const {connectDB} = require("./config/database")

const { adminAuth, userAuth } = require("./middlewares/auth")


const app = express()


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

// app.use("/", (err,req, res, next)=>{
//     if(err){
//         res.status(500).send("Something went wrong  ")
//     }
// })


// app.get("/user", (req, res)=>{
    // try{
        // throw new Error("not found")
        // res.send("User data")
//     }catch(err){
//         res.status(500).send("Error contact support team")
//     }
// })

// app.use("/", (err,req, res, next)=>{
//     if(err){
//         res.status(500).send("Something went wrong  ")
//     }
// })

