import React, { useEffect, useState } from 'react';
import './admindash.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../../redux/AdminSlice';

const AdminDash = () => {
  const [search, setsearch] = useState("");
  const [display, setdisplay] = useState([]); // For storing search results
  const [user, setUsers] = useState([]); // For storing all users
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Search function 
  function searchUser() {
    if (search.trim() === "") {
      setdisplay([]);
      return;
    }
    const filteredUsers = user.filter((x) =>
      x.name.toLowerCase().includes(search.trim().toLowerCase()) ||  x.email.toLowerCase().includes(search.trim().toLowerCase())
    );
    setdisplay(filteredUsers); 
  }


  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:3000/admin/data", { withCredentials: true })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log("error at axios fetch in getting user data @ admin dash", err);
        });
    }
    fetchData();
  }, []);

  const handleEdit = async (user) => {
    navigate(`/adminedit/${user._id}`);
  };

  const handleDelete = async (user) => {
    let id = user._id;
    const response = await axios.delete(`http://localhost:3000/admin/delete/${id}`, {
      withCredentials: true,
    });
    alert(response.data.message);
  };

  const handleAddNew = () => {
    navigate("/adminadd");
  };

  const handleLogout = async () => {
    await axios.post("http://localhost:3000/admin/logout", {}, { withCredentials: true });
    dispatch(logoutAdmin());
    navigate("/admin");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Panel</h2>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <input
            type="text"
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search users..."
            className="search-input"
          />
          <button onClick={searchUser}>Search</button>
          <div className="buttons">
            <button onClick={handleAddNew} className="add-new-btn">Add New</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {display.length > 0
              ? display.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => handleEdit(user)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(user)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : user.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => handleEdit(user)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(user)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDash;