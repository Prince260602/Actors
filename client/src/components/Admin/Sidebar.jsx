import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar-cont">
      <div className="link-container">
        <Link to={'/admin'} className="link-item">
          <p className="text">Add Actors</p>
        </Link>
        {/* <Link to={'/admin'} className="link-item">
          <p className="text">ALL Mentors</p>
        </Link>
        <Link to={'/admin'} className="link-item">
          <p className="text">Mentors</p>
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
