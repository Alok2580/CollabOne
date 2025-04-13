const express= require("express");

const authRouter= express.Router();
const bcrypt= require("bcrypt");

const jwt =require("jsonwebtoken");

const User = require("../models/user.js");

const {userAuth,id}= require("../middleware/auth.js");

  authRouter.post("/signUp",async (req,res)=>{

try{

    // validateSignupData(req);
    const {firstName, lastName, photoId,age, gender,bio,emailId,password}=req.body;
    const saltrounds = 10;
    // console.log(photoId);
    const passwordHash= await bcrypt.hash(password,saltrounds);
    // const user = new User(


    //     // firstName,lastName,emailId,password:passwordHash,
    //     req.body

    // );

    const user = new User({
        firstName,
        lastName,
        photoId,
        emailId,
        age,
        gender,
        bio,
        password:passwordHash,
        
    })
    

    // user.password=passwordHash;

    // console.log(user.firstName);
    
    // user.password=new_password;

    
   const savedUser=  await user.save();
   const token = await savedUser.getJWT();

   res.cookie("token",token,{
    expires:new Date(Date.now()+ 8*3600000)
   });


// console.log("user was saved");
res.json({

    message:"user signedUP successfully ",
    data:savedUser,
}
);

}


catch(err){
    // console.log("there was error");
    res.status(400).send(" erorr in saving user "+ err.message);
}


// res.send("user added successfully");
//   console.log("user saved successfully");

});


    authRouter.post("/login",async (req,res)=>{

    try{
        
      const  {emailId,password}=req.body;
      const user=await User.findOne({emailId:emailId});
      if(!user){
        throw new Error("user not found with this email ID");
    
      }

      
    
    const isValidPassword = await user.validatePassword(password);
    console.log(isValidPassword);

    if(!isValidPassword){
        throw new Error("user password is invalid");
    }

        if(isValidPassword){
    
        const token =await  user.getJWT();
            // console.log(token);

        res.cookie("token",token,{expires: new Date(Date.now()+9000000),httpOnly:true});
            // res.

            // console.log(user.photoId);
            
        res.send(user);
    
        }

        // if(!isValid Password){
        //     throw new Error("invalid password");
        // }
    
    }   


    catch(err){
        // console.log(photoId);
    
        res.status(401).send("Error: "+ err.message);
    
    }
    
    });


    authRouter.post("/logout", userAuth, async (req, res) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });

        res.send("user logged out successfully");
    });

module.exports = authRouter;
