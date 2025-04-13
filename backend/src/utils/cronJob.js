// // const {  } = require('mongoose');
// const cron = require('node-cron');

// const sendEmail  = require("./sendEmail.js");
// // import { endOfDay, formatDistance, startOfDay, subDays } from "date-fns";
// const {endOfDay,formatDistance,startOfDay,subDays} = require("date-fns");

// const connectionsReqestModel = require("../models/connectionRequest.js");
// const { send } = require('express-cookie/lib/response.js');

// cron.schedule("0 8 * * *", async ()=>{

//     // console.log("hello this will get print at every second " +  new Date());

//     try{

//         const yesterday = subDays(new Date(),1);
//         const yesterdayStart = startOfDay(yesterday);

//         const yesterdayEnd = endOfDay(yesterday);

//         const pendingRequest = await connectionsReqestModel.find({

//             status:"interested",
//             createdAt:{
//                 $gte:yesterdayStart,
//                 $lt:yesterdayEnd

//             }
//         }).populate("fromUserId toUserId");

//         const listOfEmails = [ ...
//         new Set(pendingRequest.map((req)=>req.toUserId.emailId))
//         ];

//         // console.log(listOfEmails);

//         for( const email of listOfEmails){

//             try{
//                 const res = await sendEmail.run("New friend request is pending for "+email ,"there are so many peding requests for CollabOne , please login to CollabOne and accept or rejext those requests")
//                 console.log(res);
//             }
//             catch(err){
//                 console.log("ERROR",err.message);

//             }

//         }

//     }

//     catch(err){

//         console.log("ERROR" + err.message);
//     }

// });
