import { useSelector } from 'react-redux';

import {
  getIsSocketConnectionFailed,
  getIsSocketConnectionLoading
} from '../slices/realtimeMetricSlice';

const useRealtimeMetricGraphs = () => {
  const isSocketConnectionLoading = useSelector(getIsSocketConnectionLoading);

  const isSocketConnectionFailed = useSelector(getIsSocketConnectionFailed);

  return {
    isSocketConnectionLoading,
    isSocketConnectionFailed
  };
};

export default useRealtimeMetricGraphs;
