import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import highchartsIndicators from 'highcharts/indicators/indicators';
import highchartsTrendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import Boost from 'highcharts/modules/boost';
import highchartsExporting from 'highcharts/modules/exporting';
import borderRadius from 'highcharts-border-radius';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

// import './styles.scss';

Boost(Highcharts);
highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsIndicators(Highcharts);
borderRadius(Highcharts);
highchartsTrendline(Highcharts);

const Chart = ({ options }) => {
  const parentRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    highchartsAccessibility(Highcharts);
  }, []);

  return (
    <div ref={parentRef}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
        container={parentRef.current}
      />
    </div>
  );
};

Chart.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Chart;
