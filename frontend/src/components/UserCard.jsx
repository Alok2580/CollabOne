import axios from 'axios';
import React from 'react'
import {BASE_URL} from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {

// console.log("user",user);

// console.log(user);

  const {firstName, lastName, photoId ,about,gender,age,_id}= user;

  // console.log(firstName);

  // console.log(user.lastName);

  // console.log(user);


const dispatch = useDispatch();

  const handleChoice = async (status, _id)=>{
    // console.log(_id);
    try{

    await axios.post(BASE_URL+"/request"+"/"+status+"/"+_id,{},{withCredentials:true});

    dispatch(removeFeed(_id));

    }
    catch(err){
      

      console.log("ERROR "+ err.message);

    }

  }



  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm pd-5 my-10">
        <figure>
          <img

            src={photoId
            }
            alt="User Photo"
            style={{ maxWidth: '300px', maxHeight: '300px' }}

          />

        </figure>

        <div className="card-body">
          <h2 className="card-title">

            {firstName} {lastName}

          </h2>

          { age && gender && (<p>{age} {gender}</p>)}
          
          <p>{about}</p>
          <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={()=>handleChoice("ignored",_id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={()=>handleChoice("interested",_id)}>Interested</button>
           
          </div>
        </div>
      </div>
    </>
  )

}

export default UserCard;
