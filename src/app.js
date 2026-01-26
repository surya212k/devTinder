const express = require('express');

const { adminAuth, userAuth } = require("./middlewares/auth")


const app = express()


app.use("/admin", adminAuth)

app.get("/user/login", (req, res) =>{
    res.send("User logged in")
})

app.get("/user", userAuth,(req, res) =>{
    res.send("User data sent")
})

app.get("/admin/AllUserData", (req, res)=>{
    res.send("User data sent")
})


app.get("/admin/Delete", (req ,res) =>{
     res.send("Data deleted")
})

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})