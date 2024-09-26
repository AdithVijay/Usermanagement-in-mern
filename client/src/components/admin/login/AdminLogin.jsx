import React, { useState } from 'react';
import './adminLogin.css';
import axios from 'axios';

const AdminLogin = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");


  const handleSubmit =async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3000/",{email,password},{withCredentials:true})

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
