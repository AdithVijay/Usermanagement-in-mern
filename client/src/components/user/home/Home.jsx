import React, { useEffect, useState } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutUser } from '../../../redux/UserSlice';

const Home = () => {
  const dispatch= useDispatch()
  const navigate = useNavigate()
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    const [image,setImage]=useState(null)
    const homeuser = useSelector(state=>state.user.users)
    // console.log("adith home", homeuser);


  function userLogout(){
    dispatch(logoutUser())
    navigate("/login")
  }

    
    useEffect(() => {
      function fetchUser(){
        axios.get(`http://localhost:3000/user/${homeuser.id}`).then((res)=>{
          
          setname(res.data.name)
          setemail(res.data.email)
          setImage(res.data.profileImage)
          // console.log(res.data);
        })
      }
      fetchUser()
    });
    
    function update(){
      navigate("/update")
    }
    // console.log(homeuser.image)
  return (
    <div className="home-container">
      <div className="profile-card">
      <img src={`http://localhost:3000${image}`} alt="Profile" className="profile-img" />
        <h2>{name}</h2>
        <p >{email}</p>
        <div className="button-group">
          <button onClick={update} className="edit-profile-btn">Edit Profile</button>
          <button className="logout-btn" onClick={userLogout} >Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
