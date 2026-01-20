const express = require('express');


const app = express()

app.use("/user", (req, res, next) =>{
    console.log("Route handler 1 called");
    next();
},
(req, res, next) =>{
    console.log("Route handler 2 called");
    next();
},
(req, res, next) =>{
    console.log("Route handler 3 called");
    next()
},
(req, res, next) =>{
    console.log("Route handler 4 called");
    next();
},
(req, res) =>{
    res.send("Final response from /user route");
});

app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})