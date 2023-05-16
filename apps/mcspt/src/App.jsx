import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Report } from '@browserstack/mcp-shared';
import { AuthWall } from 'features/AuthWall';
import Dashboard, {
  RouteWithoutSidebarWrapper,
  Sidebar
} from 'features/Dashboard';
import Home from 'features/Home';
import ReportHeader from 'features/ReportHeader';
import TestHistory from 'features/TestHistory';
import {
  openSystemFileFromPath,
  openUrlInSystemBrowser
} from 'utils/reportRemoteFunctions';

import './api/httpInterceptor';

import ReportLoading from './features/ReportLoading';
import useAppInitiation from './useAppInitiation';

const App = () => {
  useAppInitiation();

  return (
    <HashRouter>
      <Routes>
        <Route element={<Dashboard />}>
          <Route element={<Sidebar />}>
            <Route path="home" element={<Home />} />
            <Route path="testHistory" element={<TestHistory />} />
          </Route>

          <Route element={<RouteWithoutSidebarWrapper />}>
            <Route path="generate" element={<ReportLoading />} />
            <Route
              path="report"
              element={
                <Report
                  handleUrlViaConsumer={openUrlInSystemBrowser}
                  handleFolderViaConsumer={openSystemFileFromPath}
                  headerComponent={<ReportHeader />}
                />
              }
            />
          </Route>
        </Route>

        <Route index path="/" element={<AuthWall />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
