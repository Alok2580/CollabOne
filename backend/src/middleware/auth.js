const jwt= require("jsonwebtoken");
const User= require("../models/user");
require('dotenv').config();

const userAuth=async (req,res,next)=>{

   // find the token from the cookie which is present in req
   
   try{
    

   const {token} =req.cookies;

      // if token is not valid throw the error
   if(!token) throw new Error("token is not valid");
      // validate the token

      const decoded= await jwt.verify(token,process.env.JWT_SECRET);

   // if token is valid then find the user_id in decode of the token
   const {_id}=decoded;

   // from user_id find the user 
   const user = await User.findById(_id);

   // if user does not exit throw error
   if(!user){

    throw new Error("user does not exits");

   }

   req.user=user;
   // if user exith call the next request handler 
   next();


}

catch(err){
    res.status(400).send("Error: "+ err.message);
}


}

module.exports={userAuth};
