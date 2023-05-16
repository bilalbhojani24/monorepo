import React from 'react';
import {
  DataVisualization,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  EllipsisVerticalIcon
} from '@browserstack/bifrost';
import Chart from 'common/Chart';
import PropTypes from 'prop-types';

import useVisualizationWrapper from './useVisualizationWrapper';

const singleMenu = [
  {
    id: 'lastEight',
    value: 'lastEight',
    body: (
      <div className="flex items-center">
        <span className="ml-2">Last 8</span>
      </div>
    )
  },
  {
    id: 'lastFour',
    value: 'lastFour',
    body: (
      <div className="flex items-center">
        <span className="ml-2">Last 4</span>
      </div>
    )
  }
];

export default function DataVisualizationWrapper({ data }) {
  const { currentStackedChartData } = useVisualizationWrapper(data);
  return (
    <>
      <DataVisualization
        title="Issue trend"
        analytics={
          <div className="flex items-center justify-between">
            <div className="m-4 w-full">
              <Chart options={currentStackedChartData} />
            </div>
          </div>
        }
        otherOptions={
          <Dropdown onClick={(e) => console.log(e)} id="scanFilter">
            <div className="flex">
              <DropdownTrigger
                onClick={(e) => {
                  e.stopPropagation();
                }}
                wrapperClassName="p-0 border-0 shadow-none"
              >
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </DropdownTrigger>
            </div>

            <DropdownOptionGroup>
              {singleMenu.map((opt) => (
                <DropdownOptionItem key={opt.id} option={opt} />
              ))}
            </DropdownOptionGroup>
          </Dropdown>
        }
      />
    </>
  );
}

DataVisualizationWrapper.propTypes = {
  data: {
    categories: PropTypes.instanceOf(Array),
    dataPoints: PropTypes.instanceOf(Object),
    series: PropTypes.arrayOf(String),
    color: PropTypes.arrayOf(String)
  }.isRequired
};
