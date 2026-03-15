const express=require("express");

const app=express();

// this will only handle GET call to user
app.get("/user/:userid",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"Aakash",LastName:"Maddela"})
})


app.listen(3000,()=>{
    console.log("server started..");
});