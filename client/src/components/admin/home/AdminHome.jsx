import React from 'react';
import './adminHome.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '../../../redux/AdminSlice';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const dispatch =useDispatch()
    const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logoutAdmin())
    navigate("/admin")
  };

  const goToDashboard = () => {
    navigate("/dashboard")
  };

  const user = useSelector(state=>state.admin.admin)
  console.log("checking the reduxstate @AdminHOME", user);//checking the state

  return (
    <div className="admin-home-container">
      <div className="admin-home-left">
        <h1>Admin Dashboard</h1>
        <p>Welcome to your dashboard. Manage your tasks and view statistics here.</p>
      </div>

      <div className="admin-home-right">
        <div className="admin-info">
          <h2>Admin Info</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Designation:</strong> Admin</p>
          <div className="admin-home-buttons">
            <button onClick={goToDashboard} className="dashboard-btn">Dashboard</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
