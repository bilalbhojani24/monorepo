import { fetchDefaultThresholds } from 'api/thresholds';
import { subscribeMcpPusher } from 'utils/socketConnectionManager';

import { setRealtimeThresholds } from './realtimeMetricSlice';

export const getRealtimeMetricThresholdsAndSubscribe =
  (sessionId) => async (dispatch) => {
    try {
      const response = await fetchDefaultThresholds();

      dispatch(setRealtimeThresholds(response?.threshold));

      dispatch(
        subscribeMcpPusher({
          connectionName: 'MCSPT',
          sessionId
        })
      );
    } catch (error) {
      // handle when defined by pm
    }
  };
