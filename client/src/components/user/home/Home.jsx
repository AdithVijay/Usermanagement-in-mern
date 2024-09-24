import React, { useState } from 'react';
import './Home.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Home = () => {
  const navigate = useNavigate()
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const homeuser = useSelector(state=>state.user.users)
    // console.log(homeuser);
    function update(){
      navigate("/update")
    }
  return (
    <div className="home-container">
      <div className="profile-card">
      {/* <img src="/Users/adithvijay/Developer/Usermanagement/server/multer/uploads" alt="Profile" className="profile-img" /> */}
      <img src={`http://localhost:3000${homeuser?.image.replace('/Users/adithvijay/Developer/Usermanagement/server/multer', '')}`} alt="Profile" className="profile-img" />
        <h2 onChange={setname}>{homeuser.name}</h2>
        <p >{homeuser.email}</p>
        <div className="button-group">
          <button onClick={update} className="edit-profile-btn">Edit Profile</button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
