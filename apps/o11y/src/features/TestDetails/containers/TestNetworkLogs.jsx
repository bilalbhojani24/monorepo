import React, { useEffect } from 'react';
import EmptyPage from 'common/EmptyPage';

import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';

const TestNetworkLogs = () => {
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();
  useEffect(() => {
    handleLogTDInteractionEvent({ interaction: 'network_logs_viewed' });
  }, [handleLogTDInteractionEvent]);

  return (
    <div className="h-full w-full">
      <EmptyPage isUpComing text="No networks logs available" />
    </div>
  );
};

TestNetworkLogs.propTypes = {};

export default TestNetworkLogs;
