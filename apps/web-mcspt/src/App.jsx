import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './api/httpInterceptor';

import Dashboard, { RootRedirect } from './features/Dashboard';
import ReportContainer from './features/ReportContainer';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<RootRedirect />} />

      <Route element={<Dashboard />}>
        <Route path="report/:reportId" element={<ReportContainer />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
