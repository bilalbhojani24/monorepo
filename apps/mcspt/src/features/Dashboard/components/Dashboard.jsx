import React from 'react';
import PropTypes from 'prop-types';

import useDashboard from './useDashboard';

const Dashboard = ({ children }) => {
  useDashboard();

  return <>{children}</>;
};

Dashboard.propTypes = {
  children: PropTypes.node
};

Dashboard.defaultProps = {
  children: null
};

export default Dashboard;
