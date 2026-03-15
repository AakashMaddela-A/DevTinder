const express=require("express");

const app=express();

app.use("/test",(req,res)=>{
    res.send("hello from the server");
})

app.use("/hello",(req,res)=>{
    res.send("this is hello api from server");
})

app.use("/dash",(req,res)=>{
    res.send("this is dash");
})


app.listen(3000,()=>{
    console.log("server started..");
});