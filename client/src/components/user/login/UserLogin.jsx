import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { addUser } from '../../../redux/UserSlice';
import { useDispatch } from 'react-redux';


const UserLogin = () => {
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:3000/user/login",{email,password},{
        withCredentials:true
      })
      console.log(response);
      
      dispatch(addUser(response.data));
       navigate("/home")
    }catch(err){
      console.log(err);
    }
    
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            required
            onChange={(e)=>setemail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            onChange={(e)=>setpassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">Login</button>

        <p className="signup-prompt">
          Don't have an account? <a href="/signup">Register</a>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
