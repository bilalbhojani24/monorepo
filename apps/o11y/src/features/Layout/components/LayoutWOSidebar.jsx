import React from 'react';
import { Outlet } from 'react-router-dom';
import { O11yHeader } from 'common/bifrostProxy';

export default function LayoutWOSidebar() {
  return (
    <div>
      <O11yHeader />
      <Outlet />
    </div>
  );
}
