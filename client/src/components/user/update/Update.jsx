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
    // console.log(image);

    const dispatch = useDispatch()
    let id =user.id
    // console.log(user);

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
      <button type="submit" className="register-btn">Update</button>

      
    </form>
  </div>
  )
}

export default Update
