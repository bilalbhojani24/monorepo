import React from 'react';

import useDashboard from './useDashboard';

const Dashboard = () => {
  const { projectId } = useDashboard();
  return <div>Dashboard {projectId}</div>;
};

export default Dashboard;
