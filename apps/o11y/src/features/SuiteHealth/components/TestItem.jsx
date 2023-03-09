import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { O11yTableCell } from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { milliSecondsToTime } from 'utils/dateTime';

import Platforms from './Platforms';
import TestInfo from './TestInfo';

const SnPTestItem = ({ testDetails }) => (
  <>
    <O11yTableCell wrapperClassName="py-3 pl-6">
      <TestInfo testDetails={testDetails} />
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3 w-[300px]">
      <Platforms
        platforms={testDetails.platforms}
        browsers={testDetails.browsers}
      />
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3 w-[140px] text-center">
      {testDetails?.totalFailures?.failed === undefined ? (
        '-'
      ) : (
        <p className="text-base-500 text-sm leading-5 ">
          {testDetails.totalFailures?.failed}
          {testDetails.totalFailures?.total && (
            <span className="">/{testDetails.totalFailures?.total}</span>
          )}
        </p>
      )}
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3 w-[140px] text-center">
      {testDetails?.reliability === undefined ? (
        '-'
      ) : (
        <p className="text-base-500 text-sm leading-5">
          {testDetails.reliability}
          <span className="">%</span>
        </p>
      )}
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3 w-[140px] text-center">
      <div className="text-base-500 text-sm leading-5">
        {ReactHtmlParser(milliSecondsToTime(testDetails.duration, true))}
      </div>
    </O11yTableCell>
  </>
);

SnPTestItem.propTypes = {
  testDetails: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SnPTestItem;
