// first connect to the database and then to listen
const express = require("express");
// conection of database 
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");


app.use(express.json());

//  signUp
app.post("/signup",async(req,res)=>{

    try{

    // validation of data
    validateSignUpData(req);

    const{firstName,lastName,emailId,password}=req.body;

    //encrypt the password
        const passwordHash = await bcrypt.hash(password,10);


    // creating a new instance of the User model
    const user=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
    });

        await user.save();
        res.send("User Added Successfully...");
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
});


// login
app.post("/login",async(req,res)=>{
    try{
        const {emailId,password}=req.body;

        //  Validate input
        if (!emailId || !validator.isEmail(emailId)) {
            throw new Error("Invalid Credentials!");
        }

        if (!password) {
            throw new Error("Invalid Credentials!");
        }

        //check user
        const user=await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }

        //compare password
        const isPasswordValid= await bcrypt.compare(password,user.password);

        if(isPasswordValid){
            res.send("Login Successfull..");
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
});

//get user by email
app.get("/user",async(req,res)=>{
    const userEmail=req.query.emailId;

    try{
        const user = await User.findOne({emailId:userEmail});
        if(!user){
        return res.status(404).send("User not found");
        }
        else{
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

// updation of data of user
app.patch("/user/:userId", async(req,res)=>{
    const userId = req.params?.userId; 
    const data= req.body;


    try{
        const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];
        const isUpdatedAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
        if(!isUpdatedAllowed){
            throw new Error("Update Not Allowed");
        }

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



