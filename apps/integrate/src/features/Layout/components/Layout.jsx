import React from 'react';

import INTGHeader from '../../../common/bifrostProxy/components/INTGHeader';
import { Sidebar } from '../../Sidebar/index';

const Layout = () => (
  <div className="bg-base-100 min-h-screen text-3xl">
    <INTGHeader />
    <Sidebar />
  </div>
);

export default Layout;
