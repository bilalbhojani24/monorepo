import { fetchDefaultThresholds } from 'api/thresholds';
import { subscribeMcpPusher } from 'utils/socketConnectionManager';

import {
  setIsSocketConnectionFailed,
  setIsSocketConnectionLoading,
  setRealtimeThresholds
} from './realtimeMetricSlice';

export const getRealtimeMetricThresholdsAndSubscribe =
  (sessionId) => async (dispatch) => {
    try {
      dispatch(setIsSocketConnectionLoading(true));

      const response = await fetchDefaultThresholds();

      dispatch(setRealtimeThresholds(response?.threshold));

      dispatch(
        subscribeMcpPusher({
          connectionName: 'MCSPT',
          sessionId
        })
      );
    } catch (error) {
      dispatch(setIsSocketConnectionLoading(false));
      dispatch(setIsSocketConnectionFailed(true));
    }
  };
