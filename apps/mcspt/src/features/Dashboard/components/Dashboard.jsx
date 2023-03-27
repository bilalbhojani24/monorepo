import React from 'react';
import PropTypes from 'prop-types';

import AuthLoadingModal from './AuthLoadingModal';
import Footer from './Footer';
import useDashboard from './useDashboard';

const Dashboard = ({ children }) => {
  useDashboard();

  return (
    <div className="flex h-screen w-screen flex-col">
      <>{children}</>

      <Footer />

      <AuthLoadingModal />
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
