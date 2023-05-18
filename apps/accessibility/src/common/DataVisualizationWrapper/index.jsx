import React from 'react';
import {
  DataVisualization,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  EllipsisVerticalIcon
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import Chart from 'common/Chart';
import PropTypes from 'prop-types';

import useVisualizationWrapper from './useVisualizationWrapper';

const singleMenu = [
  {
    id: 'eight',
    value: 8,
    body: (
      <div className="flex items-center">
        <span className="ml-2">Last 8 runs</span>
      </div>
    )
  },
  {
    id: 'four',
    value: 4,
    body: (
      <div className="flex items-center">
        <span className="ml-2">Last 4 runs</span>
      </div>
    )
  }
];

export default function DataVisualizationWrapper({
  data,
  title,
  wrapperClassName
}) {
  const { getStackedChartData, applyFilter } = useVisualizationWrapper(data);

  return (
    <DataVisualization
      title={title}
      wrapperClassName={twClassNames('h-[440px] bg-white', wrapperClassName)}
      size="fit-content"
      analytics={
        <div className="flex items-center justify-between">
          <div className="m-4 w-full">
            <Chart options={getStackedChartData()} />
          </div>
        </div>
      }
      otherOptions={
        <Dropdown onClick={(e) => applyFilter(e.value)} id="scanFilter">
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
  );
}

DataVisualizationWrapper.propTypes = {
  wrapperClassName: PropTypes.string,
  data: {
    categories: PropTypes.instanceOf(Array),
    dataPoints: PropTypes.instanceOf(Object),
    series: PropTypes.arrayOf(String),
    color: PropTypes.arrayOf(String)
  }.isRequired,
  title: PropTypes.string.isRequired
};

DataVisualizationWrapper.defaultProps = {
  wrapperClassName: ''
};
