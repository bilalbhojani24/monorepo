import React from 'react';
import { Outlet } from 'react-router-dom';
import HSTHeader from 'features/HSTHeader/component';

const LayoutWOSidebar = () => (
  <>
    <HSTHeader />
    <main className="bg-base-50 flex">
      <Outlet />
    </main>
  </>
);

export default LayoutWOSidebar;
