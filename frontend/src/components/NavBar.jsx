import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {removeUser} from '../utils/userSlice.js';
import axios from 'axios';

import {BASE_URL} from '../utils/constants.js';
const NavBar = () => {


  const user = useSelector((store)=> store.user);
  // console.log(user);
  const dispatch=useDispatch();
  const navigate= useNavigate();

  const handleLogout = async()=>{
    try{
      await axios.post(BASE_URL+"/logout",{}, {withCredentials: true});
      dispatch(removeUser());
      return navigate("/login");
    }
    catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl rounded-full">
          <img
            src="https://res.cloudinary.com/ddu6tybft/image/upload/v1744556033/collabOne_ql5nnr.png"
            alt="CollabOne Logo"
            className="w-8 h-8"
          />
          CollabOne
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {/* other code if needed */}
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
            {/* dropdown content */}
          </div>
        </div>

        { user   &&(<div className="dropdown dropdown-end mx-10">
          <div
            tabIndex={0}
            role="button"
            className="flex items-center gap-2 btn btn-ghost">
            <span className="user-greeting">Welcome {user.firstName} </span>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoId} />
              </div>
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>

            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>

        </div>)

  
      }

      </div>
    </div>
  )
}


export default NavBar
