import React, { useEffect } from 'react';

import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';

const TestNetworkLogs = () => {
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();
  useEffect(() => {
    handleLogTDInteractionEvent({ interaction: 'network_logs_viewed' });
  }, [handleLogTDInteractionEvent]);

  return <div>TestNetworkLogs</div>;
};

TestNetworkLogs.propTypes = {};

export default TestNetworkLogs;
