import React from 'react';
import { O11yTableCell } from 'common/bifrostProxy';
import DetailIcon from 'common/DetailIcon';
import MiniChart from 'common/MiniChart';
import PropTypes from 'prop-types';
import {
  capitalize,
  getIconName,
  getOsIconName,
  getShortOSName
} from 'utils/common';

const PlatformRow = ({ buildData }) => {
  const { browser } = buildData;
  return (
    <>
      <O11yTableCell wrapperClassName="py-3">
        <div className="flex gap-2">
          <DetailIcon
            icon={`icon-${getOsIconName(buildData?.os?.name)}`}
            text={
              buildData?.os?.name
                ? `${getShortOSName(buildData?.os?.name)} ${
                    buildData?.os?.version
                  }`
                : '-'
            }
            size="large"
          />
          <DetailIcon
            icon={getIconName(browser?.name, browser?.device.name)}
            text={
              browser.device.name
                ? browser.device.name
                : `${capitalize(browser.name)} ${browser.version}`
            }
            size="large"
          />
        </div>
      </O11yTableCell>
      <O11yTableCell wrapperClassName="py-3">
        <div className="flex w-full items-center gap-4">
          <div className="h-5 w-12">
            <MiniChart
              data={buildData.chartData}
              chartType="area"
              color="var(--colors-danger-100)"
              lineColor="var(--colors-danger-400)"
            />
          </div>
          <p className="text-base-500 text-sm leading-5">
            {buildData.errorCount ? buildData.errorCount : '-'}
          </p>
        </div>
      </O11yTableCell>
      <O11yTableCell wrapperClassName="py-3">
        {buildData?.totalFailure ? buildData.totalFailure : '-'}
      </O11yTableCell>
    </>
  );
};

PlatformRow.propTypes = {
  buildData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default PlatformRow;
