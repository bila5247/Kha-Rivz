import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer'; // Assuming you have a Footer component
import Sidebar from './Sidebar'
const Layout = ({componentName , children }) => {
  console.log('new component name is ' , componentName);
 
  return (
    <div>
      <Header componentName={componentName} />
      <Sidebar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
