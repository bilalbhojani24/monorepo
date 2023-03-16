import React from 'react';
import { Outlet } from 'react-router-dom';

const RouteWithoutSidebarWrapper = () => (
  <div className="flex max-h-[calc(100%-2rem)] flex-1 overflow-scroll">
    <Outlet />
  </div>
);

export default RouteWithoutSidebarWrapper;
