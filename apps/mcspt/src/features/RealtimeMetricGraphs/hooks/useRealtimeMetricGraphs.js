import { useSelector } from 'react-redux';
import { getSessionDetails } from 'features/Home';

import {
  getIsSocketConnectionFailed,
  getIsSocketConnectionLoading
} from '../slices/realtimeMetricSlice';

const useRealtimeMetricGraphs = () => {
  const sessionDetails = useSelector(getSessionDetails);

  const isSocketConnectionLoading = useSelector(getIsSocketConnectionLoading);

  const isSocketConnectionFailed = useSelector(getIsSocketConnectionFailed);

  return {
    isSocketConnectionLoading,
    isSocketConnectionFailed,
    sessionDetails
  };
};

export default useRealtimeMetricGraphs;
