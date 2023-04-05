import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Dashboard, {
  RouteWithoutSidebarWrapper,
  Sidebar
} from 'features/Dashboard';
import Home from 'features/Home';
import TestHistory from 'features/TestHistory';

import './api/httpInterceptor';

import Report from './features/Report';
import ReportLoading from './features/ReportLoading';

const App = () => (
  <HashRouter>
    <Dashboard>
      <Routes>
        <Route element={<Sidebar />}>
          <Route index element={<Home />} />

          <Route path="testHistory" element={<TestHistory />} />
          <Route path="thresholdPresets" element={<></>} />
        </Route>

        <Route element={<RouteWithoutSidebarWrapper />}>
          <Route path="generate" element={<ReportLoading />} />
          <Route path="report" element={<Report />} />
        </Route>
      </Routes>
    </Dashboard>
  </HashRouter>
);

export default App;
