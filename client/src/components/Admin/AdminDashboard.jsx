import React from 'react';
import AdminHeader from './AdminHeader';
import Sidebar from './Sidebar';
import './AdminDashboard.css';
import MentorForm from './MentorForm';

function AdminDashboard() {
  return (
    <>
      <div className="admin-dashboard">
        <AdminHeader />
        <div className="dashboard-content">
          <Sidebar />
          <MentorForm/>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
