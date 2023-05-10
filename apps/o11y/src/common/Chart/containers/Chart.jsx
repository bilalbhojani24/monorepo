import React from 'react';
import { twClassNames } from '@browserstack/utils';
import Highcharts from 'highcharts/highstock';
import highchartsIndicators from 'highcharts/indicators/indicators';
import highchartsTrendline from 'highcharts/indicators/trendline';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import Boost from 'highcharts/modules/boost';
import highchartsDrilldown from 'highcharts/modules/drilldown';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsHeatmap from 'highcharts/modules/heatmap';
import highchartsTreemap from 'highcharts/modules/treemap';
import highchartsBorderRadius from 'highcharts-border-radius';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

Boost(Highcharts);
highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsIndicators(Highcharts);
highchartsTrendline(Highcharts);
highchartsBorderRadius(Highcharts);
highchartsDrilldown(Highcharts);
highchartsHeatmap(Highcharts);
highchartsTreemap(Highcharts);

const HIGHCHARTS_DATA_ATTRIBUTE_OVERRIDE_STYLE =
  '[&_div[data-highcharts-chart]]:absolute [&_div[data-highcharts-chart]]:h-full [&_div[data-highcharts-chart]]:w-full';
const Chart = ({ options, chartRef }) => (
  <div
    className={twClassNames(
      'relative h-full overflow-hidden',
      HIGHCHARTS_DATA_ATTRIBUTE_OVERRIDE_STYLE
    )}
  >
    <HighchartsReact highcharts={Highcharts} options={options} ref={chartRef} />
  </div>
);

Chart.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
  chartRef: PropTypes.objectOf(PropTypes.any)
};

Chart.defaultProps = {
  chartRef: { current: null }
};

export default Chart;
