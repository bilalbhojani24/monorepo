import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HeaderDummy from 'features/HeaderDummy';
import MainRoute from 'features/MainRoute';
import SideNav from 'features/SideNav';

function App() {
  return (
    <BrowserRouter>
      <HeaderDummy />
      <div className="bg-base-50 flex min-h-screen items-stretch pt-16">
        <SideNav />
        <MainRoute />
      </div>
    </BrowserRouter>
  );
}

export default App;
