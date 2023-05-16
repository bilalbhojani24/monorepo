import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getConfigurationsThunk } from '../../../api';

import LogsHeader from './LogsHeader';

const Logs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConfigurationsThunk());
  }, [dispatch]);
  return (
    <div className="h-full">
      <LogsHeader />
    </div>
  );
};
export default Logs;
