// first connect to the dabase and then to listen
const express = require("express");
// conection of database 
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user")


// storing dummy data into database
app.post("/signup",async(req,res)=>{
    const userObj={
        firstName:"Aakash",
        lastName:"Maddela",
        emailId:"maddelaaakash4499@gmail.com",
        password:"Aakash@2004"
    }

    //creating new instance of the user model
    const user=new User(userObj);

    try{
        await user.save();
        res.send("User Added Successfully...");
    }
    catch(err){
        res.status(400).send("Error saving the user:", + err.message);
    }
})















connectDB().then(()=>{
    console.log("database connection successfull");
    app.listen(3000,()=>{
    console.log("server started..");
});

}).catch((err)=>{
    console.err("database cannot be connected")
})



