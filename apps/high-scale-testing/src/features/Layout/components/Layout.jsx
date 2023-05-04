import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@browserstack/bifrost';

const Layout = () => (
  <>
    <Header productName="High Scale Testing" release="alpha" />
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;
