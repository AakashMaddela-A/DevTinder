const express=require("express");

const app=express();

app.use("/",(req,res,next)=>{
    next();
})

app.get("/user",(req,res,next)=>{
    console.log("handling the route user!!");
    next();
});
app.get("/user",(req,res,next)=>{
    console.log("handling the route user!!");
    res.send("2nd route handler");
});




app.listen(3000,()=>{
    console.log("server started..");
});