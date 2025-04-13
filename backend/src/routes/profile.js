const express= require("express");
const profileRouter= express.Router();
const {userAuth,id}= require("../middleware/auth.js");
const User=require("../models/user.js");
const {validateProfileData,validateNewPassword}= require("../utils/validation.js");
profileRouter.use(express.json());

profileRouter.get("/profile/view", userAuth ,async (req,res)=>{

    try{

      const user = req.user;
      
    if(!user) throw new Error("user does not exit ");
    // console.log(user);
    res.send(user);

    
    }


    catch(err){

        res.status(401).send("something went wrong : "+ err.message);
        
    }


})

 profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
   
try{

  if(!validateProfileData(req)){
    throw new Error("invalid edit request");
   }

  else{

    const loggedInUser = req.user;

    // console.log(loggedInUser);
    // loggedInUser.firstName=req.body.firstName;
    // loggedInUser.lastName=req.body.lastName;
    // loggedInUser.age=req.body.age;
    // req.user=loggedInUser;

    Object.keys(req.body).forEach((key)=>{
      loggedInUser[key]=req.body[key];
    })

    await loggedInUser.save();
    


    // req.user=loggedInUser;


    res.json(
      {
        message:`${loggedInUser.firstName} your data is updated successfully`,
        data:loggedInUser

      }

    )
    // res.send("user updated successfully")
  } 

}

catch(err){

  res.status(401).send("Error"+ err.message);

}

})


profileRouter.patch("/profile/password",userAuth,async (req,res)=>{
try{

  validateNewPassword(req);

  const loggedInUser= req.user;
  loggedInUser.password=req.body.password;
  await loggedInUser.save();
res.send("password updated successfully");

}

catch(err){
  res.status(401).send("Error :" +err.message);
}


})

module.exports = profileRouter;