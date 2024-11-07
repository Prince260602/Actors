import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHeader.css';

function AdminHeader() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="header-container">
      <span>Admin Dashboard</span>
 
<button
  className="logout-button"
  onClick={handleLogout}
>
  LogOut
</button>

      {token && (
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default AdminHeader;
