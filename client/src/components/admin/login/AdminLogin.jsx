import React, { useState } from 'react';
import './adminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAdmin } from '../../../redux/AdminSlice';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const user = useSelector(state=>state.admin.admin)
  console.log("checking the reduxstate @Adminlog", user);//checking the state

  const handleSubmit =async (e) => {
    e.preventDefault(); 
    try{
      const response = await axios.post("http://localhost:3000/admin/login",{email,password},{withCredentials:true})
      alert(response.data.message);
      console.log("admin Login data", response);
      dispatch(addAdmin(response.data))
       navigate("/adminhome")
    }catch(err){
      alert(err.response?.data?.message || 'Something went wrong');
    }
   
   
  };

  

  return (
    <div className="unique-admin-login-container">
      <div className="unique-admin-login-left">
        <h1>Admin Portal</h1>
        <p>Sign in to manage your dashboard</p>
      </div>

      <div className="unique-admin-login-right">
        <form className="unique-login-form" onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <div className="unique-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              onChange={(e)=>setemail(e.target.value)}
            />
          </div>

          <div className="unique-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e)=>setpassword(e.target.value)}
            />
          </div>

          <button type="submit" className="unique-login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
