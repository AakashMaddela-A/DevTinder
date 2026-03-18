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
        res.status(400).send("Error saving the user:" + err.message);
    }
});

//get user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.query.emailId;

    try{
        const user = await User.findOne({emailId:userEmail});
        if(user.length===0){
            res.status(404).send("User not found");
        }else{
        res.send(user);
        }
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

//feed API - GET /feed -get all the users from the database
app.get("/feed",async(req,res)=>{

    try{
        const user = await User.find({});
        res.send(user)
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
});

//delete a user database
app.delete("/user",async(req,res)=>{
    const userId=req.query.userId; 
    try{
        // const user= await User.findByIdAndDelete({_id:userId})
        const user= await User.findByIdAndDelete(userId);
        res.send("User Deleted Successfully..");
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

// updation of database
app.patch("/user", async(req,res)=>{
    const userId = req.query.userId; 
    const data= req.body;
    try{
        const user= await User.findByIdAndUpdate(userId, data,{returnDocument:"after",runValidators:true});
        console.log(user);
        res.send("User Updated Successfully..");
    }
    catch(err){
        res.status(400).send("UPDATE FAILED:" + err.message);
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



