import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './features/Dashboard';
import Home from './features/Home';
import Report from './features/Report';
import ReportLoading from './features/ReportLoading';

export default function Counter() {
  return (
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
}
