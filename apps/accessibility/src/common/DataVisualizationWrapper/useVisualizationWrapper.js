import { useState } from 'react';

import { chartOptionStacked } from './options';

export default function useVisualizationWrapper({
  categories,
  dataPoints,
  series,
  colors
}) {
  const [data, setData] = useState(dataPoints);

  const applyFilter = (value) => {
    const filteredData = {};
    Object.entries(dataPoints).forEach((val) => {
      filteredData[val[0]] = val[1].slice(-value);
    });
    setData(filteredData);
  };

  const getStackedChartData = () => {
    const currentStackedChartData = { ...chartOptionStacked };
    currentStackedChartData.xAxis.categories = categories;
    currentStackedChartData.series = series.map((val) => ({
      name: val.charAt(0).toUpperCase() + val.slice(1),
      data: data[val],
      borderWidth: 0,
      color: colors[val],
      pointWidth: 12,
      borderRadiusTopLeft: '10px',
      borderRadiusTopRight: '10px',
      events: {
        click(event) {
          console.log('Hi', event.point.index);
        }
      }
    }));

    return currentStackedChartData;
  };

  return { getStackedChartData, applyFilter };
}
