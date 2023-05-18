import React from 'react';
import { Outlet } from 'react-router-dom';

import AppPerformanceHeader from './AppPerformanceHeader';

const Dashboard = () => (
  <div className="flex h-screen w-screen flex-col">
    <AppPerformanceHeader />

    <div className="mt-16 flex flex-1">
      <Outlet />
    </div>
  </div>
);

export default Dashboard;
