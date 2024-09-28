import React, { useState } from 'react'
import './signup.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const UserSignup = () => {
  const navigate = useNavigate();

    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [image, setProfileImage] = useState(null); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const response =await axios.post("http://localhost:3000/user/create",{name,image,email,password},{ headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          }})
          alert(response.data.message);
          console.log(response.data)
          navigate("/login")
        }catch(err){
          alert(err.response?.data?.message || 'Something went wrong');
        }
      
      };

  return (
    <div className="register-container">
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Name"
          required
          onChange={(e)=>setname(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter Email"
          onChange={(e)=>setemail(e.target.value)}
          required
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
      <div>
      <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            onChange={(e) => setProfileImage(e.target.files[0])} // Handle image file input
          />
        </div>
      </div>
      <button type="submit" className="register-btn">Register</button>

      <p className="login-prompt">
        Already Have an Account? <a href="/login">Login</a>
      </p>
    </form>
  </div>
  )
}

export default UserSignup
