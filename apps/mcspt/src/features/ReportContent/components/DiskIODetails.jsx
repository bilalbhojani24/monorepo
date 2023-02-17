import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useDiskIODetails from './useDiskIODetails';

const DiskIODetails = () => {
  const { diskIOChartOptions } = useDiskIODetails();

  return (
    <div className="relative h-[140px]">
      <div className="absolute top-0 left-0 w-full">
        {diskIOChartOptions && (
          <HighchartsReact
            highcharts={Highcharts}
            options={diskIOChartOptions}
          />
        )}
      </div>
    </div>
  );
};
export default DiskIODetails;
