import React, { useEffect, useState } from 'react';
import './adminedit.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AdminEdit = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    console.log("userid @ editpage",id);//to disply the id in edit 
    
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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




  useEffect(() => {
    function fetchUser(){
      axios.get(`http://localhost:3000/admin/editUser/${id}`,{ withCredentials: true,}).then((res)=>{
        setName(res.data.name)
        setEmail(res.data.email)
        setProfileImage(res.data.profileImage)
         console.log("@admin edit respone",res.data);
      }).catch((err)=>{
        console.log(err);
      })
    }
    fetchUser()
  }, []);



  const handleSubmit =async (e) => {
    console.log("profile image check @adminedit",image);
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


    try{
      const response =await axios.put("http://localhost:3000/admin/update",{image,id,name,email},{
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true, // Ensure cookies are sent
      })
      console.log(response.data);
      navigate("/dashboard")
    }catch(err){
      console.log(err);
    }
   
  };

  return (
    <div className="admin-edit-container">
      <div className="admin-edit-card">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Enter name"
            />
              {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="Enter email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label>Profile Image</label>
            <input
              type="file"
              onChange={(e)=> setProfileImage(e.target.files[0])}
              className="input-file"
            />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>
          <button type="submit" className="btn submit-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default AdminEdit;
