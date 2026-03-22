
const express=require("express");
const userRouter=express.Router();

const {userAuth} = require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionrequest");
const User=require("../models/user");


// get all the pending connection requests
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionRequests=await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId",["firstName","lastName","photoUrl"]); // send the firstname and lastname


        res.json({message: "Data fetched successfully", data: connectionRequests,})

    }
    catch(err){
        req.statusCode(400).send("ERROR: " + err.message);
    }
})

// user connections
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user;

        const connectionRequests=await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ],
        }).populate("fromUserId",["firstName","lastName","photoUrl"])
        .populate("toUserId",["firstName","lastName","photoUrl"]);

        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({data});

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message)
    }
})

// feed
userRouter.get("/feed",userAuth,async(req,res)=>{
    try{

        // user should see all the other cards
        // he not see his own card
        // he not see his own connections
        // he not see ignored he profile

        const loggedInUser=req.user;


        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;


        // find all connection requests (send) and (received)
        const connectionRequests= await ConnectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id},
            ]
        }).select("fromUserId toUserId");

        // finding unique users
        const hideUsersFromFeed= new Set();
        connectionRequests.forEach(req=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })


        // sending only unique
        const users= await User.find({
           $and: [
            {_id: {$nin: Array.from(hideUsersFromFeed)},},
            {_id: {$ne: loggedInUser._id}},
           ],
        }).select(["firstName","lastName","photoUrl"])
        .skip(skip)
        .limit(limit);

        res.send(users);

    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})





module.exports=userRouter;