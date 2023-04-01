import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

import { getSessionMetrics } from '../slices/reportSlice';

const useReport = () => {
  const sessionData = useSelector(getSessionMetrics);

  useEffect(() => {
    setTimeout(() => {
      mcpAnalyticsEvent('csptTestQuit', {
        testMetadata: {
          duration:
            new Date(sessionData.startTime) - new Date(sessionData.endTime),
          selMobDeviceProperties: sessionData?.device,
          selAppProperties: sessionData?.package
        }
      });
    }, 30000);
  });

  return { sessionData };
};

export default useReport;
