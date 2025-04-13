const mongoose= require("mongoose");
const User = require("../models/user.js");

const connectionRequestSchema= new mongoose.Schema({

    fromUserId:{

        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"  // reference to the user collection

    },

    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    
    status:{

        type:String,
        required:true,
        enum:{
            values:["accepted","rejected","ignored","interested"],
            message:`{VALUE} does not belong to status`
        },
        
    }


}
,{
    timestamps:true
}
)

connectionRequestSchema.pre("save",async function(next){
    // const ConnectionRequest=this;
   const  toUserId=this.toUserId;
   const  fromUserId=this.fromUserId;
//    const status1=this.status;

    if(toUserId==fromUserId){
        throw new Error ("cannot send connection to yourself");
    }
   
next();
});

connectionRequestSchema.index({fromUserId:1,toUserId:1});

const connectionRequestModel=new mongoose.model(
    "ConnectionRequest",connectionRequestSchema
);



module.exports=connectionRequestModel;

