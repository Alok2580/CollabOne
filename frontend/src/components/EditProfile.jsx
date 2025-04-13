import React from 'react'
import { useDispatch } from 'react-redux';
import {useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import {BASE_URL} from '../utils/constants';
import {addUser} from '../utils/userSlice'

const EditProfile = ({user}) => {

  // const navigate = useNavigate();

  // console.log("in edit profile",user.firstName);


const [firstName, setFirstName]= useState(user.firstName);
const [lastName,setLastName] = useState(user.lastName);
const [age,setAge] = useState(user.age);
const [gender,setGender] = useState(user.gender);
const [about, setAbout] = useState(user.bio);
const [photoId, setPhotoId] = useState(user.photoId);


let [showToast, setShowToast] = useState(false);

const dispatch = useDispatch();

const [err,setError] = useState("");


const saveProfile= async ()=>{


  try{
    
      const res = await axios.patch(BASE_URL + "/profile/edit",{

          firstName,
          lastName,
          photoId,
          age,
          gender,
          about,

        },{withCredentials:true});

        console.log(res);

        dispatch(addUser(res?.data?.data));
        setShowToast(true);

        setTimeout(()=>{
          setShowToast(false);
        },3000);


          
       

      }

      catch(err) {
        // console.log(err.message);
        setError(err.message)
      }

}


  return (
    <div className="flex justify-center">

    <div className='flex justify-center '>
  <div className="card bg-base-200 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title flex justify-center">🧑‍💻</h2>

    <label className="form-control w-full max-w-xs">
  <div className="label py-3">

    <span className="label-text">firstName</span>
    <span className="label-text-alt"></span>

  </div>

  <input type="text" value={firstName} placeholder="firstName" className="input input-bordered w-full max-w-xs"  onChange={(e)=> setFirstName(e.target.value)}/>
  <div className="label">
  </div>

   </label>


    <label className="form-control w-full max-w-xs">
  <div className="label py-3">
    <span className="label-text">lastName</span>
    <span className="label-text-alt"></span>
  </div>
  <input type="text" value={lastName} placeholder="lastName" className="input input-bordered w-full max-w-xs" onChange={(e)=>setLastName(e.target.value)} />
  <div className="label">
  </div>
</label>

    <label className="form-control w-full max-w-xs">
  <div className="label py-3">
    <span className="label-text">photoId</span>
    <span className="label-text-alt"></span>
  </div>
  <input type="text" value={photoId} placeholder="photoId" className="input input-bordered w-full max-w-xs" onChange={(e)=>setPhotoId(e.target.value)} />
  <div className="label">
  </div>
</label>

    <label className="form-control w-full max-w-xs">
  <div className="label py-3">
    <span className="label-text">Age</span>
    <span className="label-text-alt"></span>
  </div>
  <input type="text" value={age} placeholder="lastName" className="input input-bordered w-full max-w-xs" onChange={(e)=>setAge(e.target.value)} />
  <div className="label">
  </div>
</label>
    <label className="form-control w-full max-w-xs">
  <div className="label py-3">
    <span className="label-text">Gender</span>
    <span className="label-text-alt"></span>
  </div>
  <input type="text" value={gender} placeholder="lastName" className="input input-bordered w-full max-w-xs" onChange={(e)=>setGender(e.target.value)} />
  <div className="label">
  </div>
</label>
    <label className="form-control w-full max-w-xs">
  <div className="label py-3">
    <span className="label-text">About</span>
    <span className="label-text-alt"></span>
  </div>

  <input type="text" value={about} placeholder="lastName" className="input input-bordered w-full max-w-xs" onChange={(e)=>setAbout(e.target.value)} />
  <div className="label">

  </div>
</label>


<p className='text-red-500'>{err}</p>
    <div className="card-actions justify-center py-3">
      <button className="btn btn-primary " onClick={saveProfile}>Save Profile</button>


    </div>

  </div>
</div>

</div>


<UserCard  user={{ firstName, lastName, photoId, age, gender, about }}/>


{showToast && (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile Saved</span>
  </div>
 </div>)}

</div>


  )
}


export default EditProfile
