import React, { useEffect, useState } from 'react'
import './update.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../redux/UserSlice';
const Update = () => {
  const navigate = useNavigate();
  const user= useSelector(state=>state.user.users)
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [image, setProfileImage] = useState(null); 
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};  
      if (!name.trim()) newErrors.name = "Name is required.";
      if (!email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Email is invalid.";
      }
      if (!image) newErrors.image = "Profile image is required.";
      return newErrors;
    };

    let id =user.id
    
    useEffect(() => {
        function fetchUser(){
          axios.get(`http://localhost:3000/user/${user.id}`).then((res)=>{
            setname(res.data.name)
            setemail(res.data.email)
            setProfileImage(res.data.profileImage)
            // console.log(res.data);
          }).catch((err)=>{
            console.log(err);
          })
        }
        fetchUser()
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        try{
          const response = await axios.put("http://localhost:3000/user/update",{ image, id, name, email },
            {
              headers: { 'Content-Type': 'multipart/form-data' },
              withCredentials: true, // Ensure cookies are sent
            }
          )
          console.log("this is the response fro srver",response.data);
        //   dispatch(addUser(response.data.updatedUser))
            navigate("/home")
        }catch(err){
          console.log(err);
        }
      };


  return (
    <div className="register-container">
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Edit User</h2>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Name"
          required
          value={name}
          onChange={(e)=>setname(e.target.value)}
        />
         {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setemail(e.target.value)}
          required
        />
         {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
      <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            onChange={(e) => setProfileImage(e.target.files[0])} // Handle image file input
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
      </div>
      <button type="submit" className="register-btn">Update</button>

      
    </form>
  </div>
  )
}

export default Update
