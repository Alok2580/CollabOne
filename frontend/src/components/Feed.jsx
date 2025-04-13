import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BASE_URL} from '../utils/constants';
// import { useNavigate } from 'react-router-dom';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';


const Feed = () => {

const feed= useSelector((store)=>store.feed);
const dispatch = useDispatch();
// const navigate = useNavigate();
// console.log("feed",feed);
const getFeed = async()=>{

// if(feed && feed.length) return ;

try{

const res= await axios.get(BASE_URL+"/feed",{withCredentials:true});
// console.log("res",res);

dispatch(addFeed(res?.data?.data));

// console.log(res.data.data);
// console.log("printing in feed",res?.data.data);
// console.log("checking in feed");

}

catch(err){

console.log("ERROR"+ err.message);

}


}

useEffect(()=>{

  getFeed();
},[]);

// console.log("feed",feed);
// userCard(user);
if(!feed) return ;
if(feed.length==0){
  return (
    <h2 className='text-center py-10 font-bold text-2xl'>you have reached end of the feed</h2>
  )
}

  return feed && (

    // console.log("hello in feed return")
    <div className='flex justify-center '>
     < UserCard user = {feed[0]} />

 

    </div>

    )
}

export default Feed;
