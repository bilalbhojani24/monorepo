import React from 'react';
import { O11yTableCell } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import Browsers from './Browsers';
import Platforms from './Platforms';
import TestInfo from './TestInfo';

const SnPTestItem = ({ testDetails }) => (
  <>
    <O11yTableCell wrapperClassName="py-3 pl-6">
      <TestInfo testDetails={testDetails} />
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3 pl-6">
      <Platforms platforms={testDetails.platforms} />
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3 pl-6">
      <Browsers browsers={testDetails.browsers} />
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3 pl-6">
      {testDetails?.totalFailures?.failed === undefined ? (
        '-'
      ) : (
        <p className="">
          {testDetails.totalFailures?.failed}
          {testDetails.totalFailures?.total && (
            <span className="">/{testDetails.totalFailures?.total}</span>
          )}
        </p>
      )}
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3 pl-6">
      {testDetails?.reliability === undefined ? (
        '-'
      ) : (
        <p className="">
          {testDetails.reliability}
          <span className="">%</span>
        </p>
      )}
    </O11yTableCell>
    <O11yTableCell wrapperClassName="py-3 pl-6">
      <div className="">
        {/* <p className="to-snp-tests__big-number">{ReactHtmlParser(milliSecondsToTime(data.duration, true))}</p> */}
      </div>
    </O11yTableCell>
  </>
);

SnPTestItem.propTypes = {
  testDetails: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SnPTestItem;
