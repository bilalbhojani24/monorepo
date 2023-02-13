import React from 'react';
import PropTypes from 'prop-types';

import useDashboard from './useDashboard';

import '../styles/Dashboard.scss';

export default function Dashboard({ children }) {
  useDashboard();

  return <>{children}</>;
}

Dashboard.propTypes = {
  children: PropTypes.node
};

Dashboard.defaultProps = {
  children: null
};
