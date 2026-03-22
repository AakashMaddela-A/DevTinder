
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

            res.send(user);
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
});

//logout
authRouter.post("/logOut",async(req,res)=>{
        // clear the cookie
        res.clearCookie("token");

        res.send("Logged out successfully");
})

// forgot password
authRouter.post("/forgot-password", async (req, res) => {
    try {
        const { emailId } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("User not found");
        }

        // generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetOTP = otp;
        user.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        // For now send OTP in response (later email it)
        res.send({
            message: "OTP sent successfully",
            otp
        });

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

// reset password
authRouter.post("/reset-password", async (req, res) => {
    try {
        const { emailId, otp, newPassword } = req.body;

        const user = await User.findOne({ emailId });

        if (!user) {
            throw new Error("User not found");
        }


        console.log("DB OTP:", user.resetOTP);
        console.log("Entered OTP:", otp);


        // check OTP
        if (
            user.resetOTP !== String(otp) ||
            user.resetOTPExpiry < Date.now()
        ) {
            throw new Error("Invalid or expired OTP");
        }

        // hash new password
        const passwordHash = await bcrypt.hash(newPassword, 10);

        user.password = passwordHash;

        // clear OTP
        user.resetOTP = undefined;
        user.resetOTPExpiry = undefined;

        await user.save();

        res.send("Password reset successful");

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});


module.exports = authRouter;