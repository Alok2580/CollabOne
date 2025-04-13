const validator= require("validator");
const validateSignupData = (req)=>{
    
    const {firstName, lastName,emailId,password}=req.body;
    if(!validator.isEmail(emailId)){
        throw new Error("email is not valid");
    }

   else  if(!validator.isStrongPassword(password)){
        throw new Error("password is weak");
    }
    
};

const validateProfileData = (req)=>{
    const allowedProfileFields = ["firstName","lastName","photoId","age","gender","bio","about"];

     const isAllowed=Object.keys(req.body).every((key)=>{
        return allowedProfileFields.includes(key);
     })
    return isAllowed;
    
}


const validateNewPassword =(req)=>{
    const allowedProfileFields=["password"];
    const isAllowed = Object.keys(req.body).every((key)=>{
//   if(  key!="password") return false;
const ans=allowedProfileFields.includes(key);
if(!ans) return false;

    });
    

    if(isAllowed &&validator.isStrongPassword(req.body.password)) return true;
    else return false;

    // return validator.isStrongPassword(password);
}


module.exports={validateSignupData,validateProfileData,validateNewPassword};

