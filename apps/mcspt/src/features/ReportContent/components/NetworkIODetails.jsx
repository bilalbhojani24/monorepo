import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useNetworkIODetails from './useNetworkIODetails';

const NetworkIODetails = () => {
  const { networkIOChartOptions } = useNetworkIODetails();

  return (
    <div className="relative h-[140px]">
      <div className="absolute top-0 left-0 w-full">
        {networkIOChartOptions && (
          <HighchartsReact
            highcharts={Highcharts}
            options={networkIOChartOptions}
          />
        )}
      </div>
    </div>
  );
};
export default NetworkIODetails;
