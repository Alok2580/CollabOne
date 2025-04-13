
import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from "../utils/constants.js"
import NavBar from './NavBar.jsx';


const Login = ()=>{
    
  const navigate = useNavigate();
const [emailId, setEmailId]= useState("");
const [firstName, setFirstName]= useState("");
const [lastName, setLastName]= useState("");
const [isLoginForm, setIsLoginForm]= useState(true);
const [password,setPassword] = useState("");

const dispatch = useDispatch();

const[error,setError]=useState("");


const handleSignUp = async()=>{
  
  try{
    const res =await  axios.post(BASE_URL+"/signUp",{
      firstName,lastName,emailId,password

    },{withCredentials:true});

    if(res){

      console.log("user signed in successfully");

    }

    // console.log(res.data)
    dispatch(addUser(res.data.data));

    navigate("/profile");

  }

  catch(err){

    // console.log("ERROR " + err.message);
    setError(err.response.data|| "something went wrong");
  }

}

const handleLogin = async ()=>{
try{

  const res= await axios.post(`${BASE_URL}/login`,{
        emailId,password,
    },{withCredentials:true})

    if(res) {

        console.log("user loggedin successfully");

    }


    navigate('/');

    dispatch(addUser(res.data));

}


catch(err){

  // console.log(err);
setError(err.response.data ||"something went wrong ");
    //  console.log("error occured" +  err.message);

}

}

    return (

        <>

        <div className='flex justify-center py-10'>
  <div className="card bg-base-200 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title flex justify-center">🧑‍💻</h2>
    <h2 className="card-title flex justify-center">{isLoginForm? "Login":"SignUp"}</h2>

   
  <div>

  {!isLoginForm && (
    <>

<label className="form-control w-full max-w-xs">
  <div className="label py-3">

  <span className="label-text">FirstName</span>
    <span className="label-text-alt"></span>

  </div>
  <input type="text" value={firstName} placeholder="Email" className="input input-bordered w-full max-w-xs"  onChange={(e)=> setFirstName(e.target.value)}/>
  


</label>


    <label className="form-control w-full max-w-xs">
  <div className="label py-3">

    <span className="label-text">LastName</span>
    <span className="label-text-alt"></span>

  </div>
  <input type="text" value={lastName} placeholder="LastName" className="input input-bordered w-full max-w-xs"  onChange={(e)=> setLastName(e.target.value)}/>
  <div className="label">
  </div>


</label>

</> )}

</div>

    <label className="form-control w-full max-w-xs">
  <div className="label py-3">

    <span className="label-text">Email</span>
    <span className="label-text-alt"></span>

  </div>
  <input type="text" value={emailId} placeholder="Email" className="input input-bordered w-full max-w-xs"  onChange={(e)=> setEmailId(e.target.value)}/>
  <div className="label">
  </div>


</label>




    <label className="form-control w-full max-w-xs">
  <div className="label py-3">
    <span className="label-text">Password</span>
    <span className="label-text-alt"></span>
  </div>
  <input type="password" value={password} placeholder="Password" className="input input-bordered w-full max-w-xs" onChange={(e)=>setPassword(e.target.value)} />
  <div className="label">
  </div>
</label>

<p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center py-3">
      <button className="btn btn-primary " onClick={isLoginForm? handleLogin: handleSignUp}> {isLoginForm? "Login" : "SignUp"}</button>
    </div>


    <p className='m-auto cursor-pointer py-2' onClick={()=>setIsLoginForm((value)=> value=!value)}>
      {isLoginForm? `New user ? signUP here `: `Existing user ? Login here`}
    </p>

  </div>

</div>

</div>

    </>
    )

}

export default Login;

