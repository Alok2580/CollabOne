const express= require("express");
const feedRouter= express.Router();
const User = require("../models/user.js");

feedRouter.get("/feed1",async (req,res)=>{

    try{
        const users=  await User.find({});
        if(users.length==0){
            res.status(400).send("no user in your feed");
        }
        else{
            res.send(users);
        }
    }
    

    catch(err){

        res.status(400).send("something went wrong"+ err.message);

    }    


})

module.exports= feedRouter;