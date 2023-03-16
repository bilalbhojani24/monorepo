import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import useDashboard from './useDashboard';

const Dashboard = ({ children }) => {
  useDashboard();

  return (
    <div className="flex h-screen w-screen flex-col">
      <>{children}</>

      <Footer />
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
