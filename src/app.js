const express = require('express');


const app = express()

app.get("/user/:userId/:password", (req, res) =>{
    console.log(req.params)
    res.send({firstname: "Ajithkumar", lastname:"Singh"})
})


app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})