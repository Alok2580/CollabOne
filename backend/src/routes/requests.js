const express= require("express");

const {userAuth,id}= require("../middleware/auth.js");

const requestRouter= express.Router();
const User= require("../models/user.js");

const ConnectionRequest =require("../models/connectionRequest.js");
// const connectionRequestModel = require("../models/connectionRequest.js");

requestRouter.use(express.json());


// requestRouter.post("/sendConnectionRequest",userAuth,(req,res)=>{

//     res.send(req.user.firstName + " is sending connection request");

// })

const sendEmail =   require("../utils/sendEmail.js");


requestRouter.post("/request/:status/:toUserId",userAuth, async (req,res)=>{

    try{

        const user =req.user;

        const fromUserId= user._id;
        const toUserId= req.params.toUserId;
        const toUser  = await User.findById(toUserId);
        const fromUser  = await User.findById(fromUserId);
        const status = req.params.status;
        const receiver=await  User.findById(toUserId);
        console.log(fromUser.firstName);

        if(toUserId==fromUserId){

            throw new Error ("cannot send connection to yourself");

        }


        const isToUserExists=  await User.findById(toUserId);
        if(!isToUserExists){

            throw new Error("user does not exists");

        }

        const allowedStatus= ["interested","ignored"];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"invalid status type " + status });
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId ,toUserId},
                {
                    fromUserId:toUserId,toUserId:fromUserId
                }
            ]
           
     } );


        if(existingConnectionRequest){
          return   res.status(400).json({
                message:"connection already exists between these users ",
                data: {fromUserId,toUserId}
            })
        }
        

      const  connectionRequest= new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });


      const data = await connectionRequest.save();

      const emailRes  = await sendEmail.run(
        `A new friend request from ${fromUser.firstName}` ,
        `${fromUser.firstName} is ${status} in ${toUser.firstName}`
          )

          console.log(emailRes);

        // console.log(user._id);
      
        res.json(
            {

                message:`${user.firstName} ${status} in ${receiver.firstName} successfully`,
                data,
            }
        );
    }

    catch(err){
       
        res.status(401).send("ERROR: "+ err.message);

    }
})


requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
    
    try{

    const loggedInUser =  req.user;
    const {status,requestId} = req.params;
   
    const allowedStatus = ["accepted","rejected"];

    if(!allowedStatus.includes(status)){
        throw new Error("invalid status formate");
    }

    const isValidConnection = await ConnectionRequest.findOne({

        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested",

    })

    // console.log(isValidConnection);


      if(!isValidConnection){

        throw new Error("invalid request");
      }



    isValidConnection.status=status;

    await isValidConnection.save();

    res.send(`connection ${status} successfully`);

    }


    catch(err){

        res.status(400).send("ERROR : " + err.message);
    }

})

module.exports = requestRouter;
