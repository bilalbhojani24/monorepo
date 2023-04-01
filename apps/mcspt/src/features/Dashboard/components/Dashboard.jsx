import React from 'react';
import PropTypes from 'prop-types';

import AuthLoadingModal from './AuthLoadingModal';
import FeedbackModal from './FeedbackModal';
import Footer from './Footer';
import useDashboard from './useDashboard';

const Dashboard = ({ children }) => {
  useDashboard();

  return (
    <div className="flex h-screen w-screen flex-col">
      <>{children}</>

      <Footer />

      <AuthLoadingModal />

      <FeedbackModal />
    </div>
  );
};

Dashboard.propTypes = {
  children: PropTypes.node
};

Dashboard.defaultProps = {
  children: null
};

export default Dashboard;
