import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell } from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { milliSecondsToTime } from 'utils/dateTime';

import { SUITE_TESTS_HEADER_LABEL_MAPPING } from '../constants';

import Platforms from './Platforms';
import TestInfo from './TestInfo';

const SnPTestItem = ({ testDetails }) => (
  <>
    <O11yTableCell
      wrapperClassName={twClassNames(
        SUITE_TESTS_HEADER_LABEL_MAPPING.tests.defaultClass
      )}
    >
      <TestInfo testDetails={testDetails} />
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames(
        SUITE_TESTS_HEADER_LABEL_MAPPING.platforms.defaultClass
      )}
    >
      <Platforms
        platforms={testDetails.platforms}
        browsers={testDetails.browsers}
      />
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames(
        SUITE_TESTS_HEADER_LABEL_MAPPING.totalFailures.defaultClass
      )}
    >
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
    <O11yTableCell
      wrapperClassName={twClassNames(
        SUITE_TESTS_HEADER_LABEL_MAPPING.reliability.defaultClass
      )}
    >
      {testDetails?.reliability === undefined ? (
        '-'
      ) : (
        <p className="text-base-500 text-sm leading-5">
          {testDetails.reliability}
          <span className="">%</span>
        </p>
      )}
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames(
        SUITE_TESTS_HEADER_LABEL_MAPPING.average.defaultClass
      )}
    >
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
