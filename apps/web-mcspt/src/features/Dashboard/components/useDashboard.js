import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMcpAnalytics } from '@browserstack/mcp-shared';

import { initiateWebAnalytics } from '../slices/dahsboardThunks';

const useDashboard = () => {
  useMcpAnalytics();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initiateWebAnalytics());
  }, [dispatch]);
};

export default useDashboard;
