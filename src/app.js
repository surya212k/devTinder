const express = require('express');


const app = express()

app.get("/user", (req, res) =>{
    res.send({firstname: "Ajithkumar", lastname:"Singh"})
})

app.post("/user", (req,res)=>{
    res.send("Data sent to db successfully")
})

app.put("/user", (req,res) =>{
    res.send("Data put successfully")
})

app.patch("/user", (req, res) =>{
    res.send("Data patch successfull")
})

app.delete("/user", (req,res) =>{
    res.send("Data deleted successfully")
})

app.use("/user", (req, res)=>{
    res.send("Hello from user")
})


app.use("/test", (req, res)=>{
    res.send("Hello from test")
})

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})