import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => (
  <div className="flex h-screen w-screen flex-col">
    <Outlet />
  </div>
);

export default Dashboard;
