import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HeaderDummy from 'features/HeaderDummy';
import MainRoute from 'features/MainRoute';
import SideNav from 'features/SideNav';
// import Repository from './routes/Repository';

function App() {
  return (
    <BrowserRouter>
      <HeaderDummy />
      <div className="flex min-h-screen items-stretch pt-16">
        <SideNav />
        <MainRoute />
      </div>
    </BrowserRouter>
  );
}

export default App;
