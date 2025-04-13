import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {BASE_URL} from '../utils/constants';
import { addRequest, removeRequest } from '../utils/requestSlice';


const Requests = () => {

const dispatch = useDispatch();

const requests = useSelector((store)=>store.requests);

// console.log(requests);

const reviewRequest = async (reviewStatus,_id)=>{
  
  console.log(BASE_URL+`/request/review/${reviewStatus}/${_id}`);

  try{

  await axios.post(BASE_URL+`/request/review/${reviewStatus}/${_id}`,{},{withCredentials:true});
  dispatch(removeRequest(_id));

  console.log("connections reviewed accepted or rejected")

  }

  catch(err){

    console.log("ERROR: " +err.message);

  }

}


  const fetchRequest = async()=>{
try{
    const res = await axios.get(BASE_URL+"/user/requests/received" , {withCredentials:true});
    // console.log(res.data.data);

    dispatch(addRequest(res.data.data));
    // console.log(res.data.data);

  }

  catch(err){
    console.log("Error "+ err.message );
  }

}

  useEffect(()=>{
    fetchRequest();
  },[])

  if(!requests) return ;
  if(requests.length ===0 ) return(<p className='text-center font-bold text-2xl'>No pending requests  </p>)

  return (

    <div className="text-center my-10 items-center">
    <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

    {requests.map((request) => {
      
      console.log(request._id);

      const { _id, firstName, lastName, photoId, age, gender, bio } =
        request.fromUserId;

      return (
        <div
          key={_id}
          className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
        >
          <div>
        <img
          alt="photo"
          className="w-20 h-20 rounded-full object-cover"
          src={photoId}
        />
          </div>
          <div className="text-left mx-4">
        <h2 className="font-bold text-xl">
          {firstName + " " + lastName}
        </h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{bio}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
        <button className="btn btn-secondary" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
        <button className="btn btn-primary" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
          </div>
        </div>
      );
    })}
  </div>
  )
}

export default Requests