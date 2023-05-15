import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './features/Home';
import ReportContainer from './features/ReportContainer';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Home />} />

      <Route path="report/:reportId" element={<ReportContainer />} />
    </Routes>
  </BrowserRouter>
);

export default App;
