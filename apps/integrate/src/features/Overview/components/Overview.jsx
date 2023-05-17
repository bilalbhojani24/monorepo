import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getConfigurationsThunk } from '../../../api';
import RequestsChart from '../../RequestsChart';

import OverviewHeader from './OverviewHeader';

const Overview = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConfigurationsThunk());
  }, [dispatch]);
  return (
    <div className="h-full">
      <OverviewHeader />
      <div className="flex h-full flex-col px-8 lg:flex-row">
        <RequestsChart />
      </div>
    </div>
  );
};
export default Overview;
