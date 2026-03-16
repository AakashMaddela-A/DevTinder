const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);


app.get("/user", userAuth,(req,res)=>{
    res.send("All data send");
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("All data send");
});

app.get("/admin/deleteUser",(req,res)=>{
    res.send("Delete a user");
});

app.listen(3000,()=>{
    console.log("server started..");
});