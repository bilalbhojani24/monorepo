import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Chart from '../../../common/Chart';
import { setActiveTestRuns } from '../slices/thunk';

import useDashboard from './useDashboard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { pieChartOption } = useDashboard();

  useEffect(() => {
    dispatch(setActiveTestRuns(projectId));
  }, [dispatch, projectId]);

  console.log('pie chart options', pieChartOption);
  return (
    <div className="flex">
      <Chart options={pieChartOption} />
    </div>
  );
};

export default Dashboard;
