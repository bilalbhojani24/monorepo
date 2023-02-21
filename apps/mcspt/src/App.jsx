import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './api/httpInterceptor';

import Dashboard from './features/Dashboard';
import Home from './features/Home';
import Report from './features/Report';
import ReportLoading from './features/ReportLoading';

const App = () => (
  <HashRouter>
    <Dashboard>
      <Routes>
        <Route index element={<Home />} />
        <Route path="generate" element={<ReportLoading />} />
        <Route path="report" element={<Report />} />
      </Routes>
    </Dashboard>
  </HashRouter>
);

export default App;
