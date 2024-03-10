import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="content-wrapper">
        <Outlet /> {/* Renders the child routes */}
      </div>
    </>
  )
}

export default Layout;
