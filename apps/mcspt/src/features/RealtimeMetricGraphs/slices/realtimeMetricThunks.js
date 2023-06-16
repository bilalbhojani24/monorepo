import { subscribeMcpPusher } from 'utils/socketConnectionManager';

import {
  setIsSocketConnectionFailed,
  setIsSocketConnectionLoading
} from './realtimeMetricSlice';

export const getRealtimeMetricThresholdsAndSubscribe =
  (sessionId) => async (dispatch) => {
    try {
      dispatch(setIsSocketConnectionLoading(true));

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
