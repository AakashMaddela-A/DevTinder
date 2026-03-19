
const express=require("express");
const authRouter=express.Router();

const {validateSignUpData}=require("../utils/validation");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const validator = require("validator");

//  signUp
authRouter.post("/signup",async(req,res)=>{

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
authRouter.post("/login",async(req,res)=>{
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

module.exports = authRouter;