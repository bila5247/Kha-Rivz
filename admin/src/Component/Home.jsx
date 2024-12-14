import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Dashboard from "./Dashboard";

const Home = () => {
 
  return (
    <>
      <div id="layout-wrapper">
        <Header />
       <Sidebar />
        <div className="vertical-overlay" />
        <div className="main-content">
         <Dashboard />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;