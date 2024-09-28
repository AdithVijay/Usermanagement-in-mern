import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./add.css"

const AddUser = () => {
  const navigate = useNavigate();

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [image, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/admin/create',{name,image, email, password },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // Ensure cookies with the token are sent
        }
      );
      console.log(response.data);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="adduser-admin-page">
      <div className="adduser-sidebar">
        <h2>Admin Portal</h2>
        <p>Sign in to manage your dashboard</p>
      </div>
      <div className="adduser-register-container">
        <form className="adduser-register-form" onSubmit={handleSubmit}>
          <h2>Register</h2>

          <div className="adduser-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              required
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="adduser-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>

          <div className="adduser-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>

          <div className="adduser-form-group">
            <label htmlFor="profileImage">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              onChange={(e) => setProfileImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="adduser-register-btn">
            Register
          </button>

          <p className="adduser-login-prompt">
          Go back to <a href="/dashboard"> Dashboard?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
