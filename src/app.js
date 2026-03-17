// first connect to the database and then to listen
const express = require("express");
// conection of database 
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user")


app.use(express.json());

// storing dummy data into database signUp
app.post("/signup",async(req,res)=>{

    // creating a new instance of the User model
    const userObj=new User(req.body);

    try{
        await userObj.save();
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
    console.error("database cannot be connected")
})



