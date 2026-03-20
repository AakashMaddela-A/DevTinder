
const express=require("express");
const requestRouter=express.Router();

const{userAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../models/connectionrequest");
const User=require("../models/user")


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignore","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status type: " + status})
        }
        

        const toUser= await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({
                message: "User not found!!"
            })
        }


        // if there is an existing connectionrequest
        const existingConnectionRequest= await ConnectionRequest.findOne({
            $or: [
                {fromUserId,toUserId},
                {fromUserId: toUserId,toUserId: fromUserId}
            ],
        });
        if(existingConnectionRequest){
            return res.status(400).send({message : "Connection request already exists!!"})
        }



        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,

        });


        const data= await connectionRequest.save();

        res.json({
            message: "Connection Request Sent Successfully..",
            data,
        });

    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
})

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    
    try{
        const loggedInUser=req.user;
        const {status,requestId}= req.params;

        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status not allowed!!"})
        }

        // in databse there or not
        const connectionRequest= await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested",
        });


        console.log("DB Data:", connectionRequest);
        console.log("Logged User:", loggedInUser._id);



        if(!connectionRequest){
            return res.status(404).json({message: "Connection request not found"})
        }

        connectionRequest.status=status;

        const data = await connectionRequest.save();

        res.json({message: "Connection requested " + status, data });


    }
    catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
   

})

module.exports = requestRouter;