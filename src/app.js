// first connect to the database and then to listen
const express = require("express");
// conection of database 
const connectDB=require("./config/database");
const app = express();
const User=require("./models/user");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const validator = require("validator");
const jwt=require("jsonwebtoken");
const{userAuth}=require("./middlewares/auth");


app.use(express.json());
app.use(cookieParser());



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
        const user=await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }

        //compare password
        const isPasswordValid= await user.validatePassword(password);


        if(isPasswordValid){

            // create a JWT Token
            const token=await user.getJWT();

            //Add the token to cookie and send the response back to the user

            res.cookie("token", token, {httpOnly: true});

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


// profile
app.get("/profile",userAuth, async(req,res)=>{

    try{

    const user=req.user;

    res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});


app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;
    // sending a connection request
    console.log("sending a connection request");

    res.send(user.firstName + " Request sent..")
})














connectDB().then(()=>{
    console.log("database connection successfull");
    app.listen(3000,()=>{
    console.log("server started..");
});

}).catch((err)=>{
    console.error("database cannot be connected")
})



