
const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        },
        required: true,
    }
},
{
    timestamps: true,
});

// connection request
connectionRequestSchema.index({fromUserId : 1});


connectionRequestSchema.pre("save",function(){
    const connectionRequest=this;
    
    // check userid and fromuserid is same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself");
    }
})


const ConnectionRequestModel= new mongoose.model("connectionRequest", connectionRequestSchema);


module.exports = ConnectionRequestModel;