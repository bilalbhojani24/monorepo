import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { O11yTableCell } from 'common/bifrostProxy';
import DetailIcon from 'common/DetailIcon';
import PropTypes from 'prop-types';
import {
  capitalize,
  getIconName,
  getOsIconName,
  getShortOSName
} from 'utils/common';
import { milliSecondsToTime } from 'utils/dateTime';

const PlatformRow = ({ buildData }) => (
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
          icon={getIconName(
            buildData?.browser?.name,
            buildData?.browser?.device
          )}
          text={
            buildData?.browser.device
              ? buildData?.browser.device
              : `${capitalize(buildData?.browser.name)} ${
                  buildData?.browser.version
                }`
          }
          size="large"
        />
      </div>
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3">
      {buildData?.totalFailures?.failed === undefined ? (
        '-'
      ) : (
        <p className="text-base-500 text-sm leading-5 ">
          {buildData.totalFailures?.failed}
          {buildData.totalFailures?.total && (
            <span className="">/{buildData.totalFailures?.total}</span>
          )}
        </p>
      )}
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3">
      {buildData?.reliability === undefined ? (
        '-'
      ) : (
        <p className="text-base-500 text-sm leading-5">
          {buildData.reliability}
          <span className="">%</span>
        </p>
      )}
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3">
      <div className="text-base-500 text-sm leading-5">
        {ReactHtmlParser(milliSecondsToTime(buildData.duration, true))}
      </div>
    </O11yTableCell>
  </>
);

PlatformRow.propTypes = {
  buildData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default PlatformRow;
