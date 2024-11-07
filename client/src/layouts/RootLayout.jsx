import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer/index";
import Navbar from "../components/navbar/index";

const RootLayout = () => {
  return (
    <div>
    
      <Navbar />
      <Outlet />
      <Footer />
   
    </div>
  );
};

export default RootLayout;
