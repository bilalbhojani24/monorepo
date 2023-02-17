import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import variablePie from "highcharts/modules/variable-pie";
variablePie(Highcharts);
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { projectId, fetchActiveTestRuns, activeTestRuns } = useDashboard();
  useEffect(() => {
    fetchActiveTestRuns(projectId);
  }, []);

  if (!activeTestRuns) {
    return (
      <div>Hello World</div>
    )
  } else {
    return (
      <div className="flex">
        {/* <div className="overflow-hidden rounded-md"> */}
        <HighchartsReact
          highcharts={Highcharts}
          options={activeTestRuns.chart_data}
        />
      </div>
    );
  }
  
};

export default Dashboard;
