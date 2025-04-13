import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import axios from 'axios'
import {BASE_URL} from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import appStore from '../utils/appStore'

const Body = () => {

  // when refreshed user is automatically logged out 
  // fetch user profile in body before loading the components

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response && err.response.status === 400) {
        navigate("/login");
      } else {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    if (!userData)
      fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar/>
      <main className="flex-grow">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default Body
