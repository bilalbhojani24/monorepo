import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NetworkViewer } from '@browserstack/services';
import { versionedBaseRoute } from 'constants/common';
import { getEnvConfig } from 'utils/common';

import { useTestDetailsContentContext } from '../contexts/TestDetailsContext';
import { getCurrentTestRunId } from '../slices/selectors';

const TestNetworkLogs = () => {
  const currentTestRunId = useSelector(getCurrentTestRunId);
  const { handleLogTDInteractionEvent } = useTestDetailsContentContext();
  useEffect(() => {
    handleLogTDInteractionEvent({ interaction: 'network_logs_viewed' });
  }, [handleLogTDInteractionEvent]);

  if (!currentTestRunId) {
    return null;
  }

  const stageConfig = getEnvConfig();

  return (
    <NetworkViewer
      filtersWrapperClassName="top-[54px]"
      tableHeaderClassName="top-[124px]"
      reqDetailsWrapperClassName="top-[124px] h-[calc(100vh-370px)] pr-2"
      isResponseCaptured
      logsURL={`${
        stageConfig.apiUrl
      }${versionedBaseRoute()}/testRuns/${currentTestRunId}/networkLogs?trim=true`}
      fetchOptions={{
        baseURL: stageConfig.apiUrl,
        withCredentials: stageConfig.withCredentials
      }}
    />
  );
};

TestNetworkLogs.propTypes = {};

export default TestNetworkLogs;
