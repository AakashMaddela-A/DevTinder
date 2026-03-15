const express=require("express");

const app=express();

app.use("/user",(req,res,next)=>{
    // route handler
    console.log("handling the route user!!");
    next();
    // res.send("Route handler 1");
},
(req,res,next)=>{
    // route handler 2
    console.log("handling the route user 2 2!!");
    // res.send("Route handler 2");
    next();
},
(req,res,next)=>{
    // route handler 3
    console.log("handling the route user 3 !!");
    // res.send("Route handler 3");
    next();
},
(req,res)=>{
    // route handler 4
    console.log("handling the route user 4 4!!");
    res.send("Route handler 4");
}


);


app.listen(3000,()=>{
    console.log("server started..");
});