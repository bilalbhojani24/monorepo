import React from 'react';
import { Outlet } from 'react-router-dom';

import AuthLoadingModal from './AuthLoadingModal';
import FeedbackModal from './FeedbackModal';
import Footer from './Footer';

const Dashboard = () => (
  <div className="flex h-screen w-screen flex-col">
    <Outlet />

    <Footer />

    <AuthLoadingModal />

    <FeedbackModal />
  </div>
);

export default Dashboard;
