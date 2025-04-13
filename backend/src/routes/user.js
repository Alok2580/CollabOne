const express= require("express");

const userRouter= express.Router();
const User = require("../models/user.js");
const ConnectionRequest = require("../models/connectionRequest.js");

const {userAuth}  = require("../middleware/auth.js");


const bcrypt= require("bcrypt");


const { contentType } = require("express-cookie/lib/response.js");
const { connection } = require("mongoose");


const USER_SAFE_DATA = " firstName lastName gender age photoId bio skills";


userRouter.get("/user", async (req,res)=>{


    // await User.syncIndexes();


    const userEmail  =  req.body.emailId;


    try{

        const users = await User.findOne({emailId:userEmail});
        if(users.length == 0) {

            res.send("user not found");

        }

        else
        res.send(users);

    }


    catch(err){

        res.status(401).send("something went wrong"+ err.message);

    }


})



    userRouter.patch("/user",async (req,res)=>{
    
    const email=req.body.emailId;
    const data= req.body;
        // console.log(email);

    const userId=req.body._id;

    if( userId===undefined ) {
        res.status(400).send("user not found");
    }

    const filter={ _id:userId  };
    
    const update=data;
    // console.log(update);
    const options={new:true};

try{

const doc = await User.findOneAndUpdate(filter,update,options);
console.log(doc);
res.send("user updated successfully");

}

catch(err){
    res.status(400).send("something went wrong"+ err.message);
}

})

userRouter.delete("/user",async (req,res)=>{

    

    try{

        const userId=req.body._id;

        const doesUserExists = await User.findById(userId);
     
        if(!doesUserExists) {
            throw new Error(" this user does not exists");
           

        }

   await User.findByIdAndDelete(userId);

   res.send("user deleted successfully");

    }

    catch(err){

        res.status(400).send("something went wrong"+ err.message)

    }

});

// get all pending connection request for logged in user 
 userRouter.get("/user/requests/received",userAuth,async (req,res)=>{



    const loggedInUser = req.user;
    const connectionRequests  = await  ConnectionRequest.find({
        toUserId:loggedInUser.id,
        status:"interested"
    }).populate("fromUserId",USER_SAFE_DATA);
    // .populate("fromUserId",["firstName","lastName"]);


    res.json({

        message:"connections fetched successfully",
        data: connectionRequests,

    })


//    const senders=[];

// for(const element of connectionRequests){
    
//         const sender = await ConnectionRequest.findById(element._id);
//         const senderFirstName = await User.findById(sender.fromUserId);
//         senders.push(senderFirstName.firstName);

// }

// console.log(connectionRequests);

    // res.send(senders);

})


  userRouter.get("/user/connections",userAuth,async (req,res)=>{

    try{
    const loggedinUser= req.user;
    const connectionRequests = await ConnectionRequest.find({
        $or :  [
            {
                toUserId:loggedinUser._id,
                 status:"accepted"

            },{
                fromUserId:loggedinUser._id,
                 status:"accepted"
            }

        ],
       
    }).populate("fromUserId", USER_SAFE_DATA)
    .populate("toUserId",USER_SAFE_DATA);

    const data = connectionRequests.map(row => {

        if(row.toUserId._id.toString() === loggedinUser._id.toString()){
            return row.fromUserId;
        }
         return row.toUserId;
        // row.fromUserId
    
      });

      // console.log(connectionRequests);

    //   console.log(data);
    //   console.log(data[0].toString());
  
    
      res.json({data})
}

catch(err){
    res.status(400).send("ERROR: "+ err.message)
}

      });


      userRouter.get("/feed", userAuth, async (req, res) => {
        try {
          const loggedInUser = req.user;
      
          const page = parseInt(req.query.page) || 1;
          let limit = parseInt(req.query.limit) || 10;
          limit = limit > 50 ? 50 : limit;
          const skip = (page - 1) * limit;
      
          const connectionRequests = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
          }).select("fromUserId  toUserId");
      
          const hideUsersFromFeed = new Set();
          connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
          });
      
          const users = await User.find({
            $and: [
              { _id: { $nin: Array.from(hideUsersFromFeed) } },
              { _id: { $ne: loggedInUser._id } },
            ],
          })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);
      
          res.json({ data: users });
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      });
      module.exports = userRouter;
