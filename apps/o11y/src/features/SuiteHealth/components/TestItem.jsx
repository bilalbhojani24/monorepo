import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell } from 'common/bifrostProxy';
import { TABS as TEST_DETAILS_TABS } from 'features/SHTestDetails/constants';
import { setSHTestDetailsActiveTab } from 'features/SHTestDetails/slices/dataSlice';
import PropTypes from 'prop-types';
import { milliSecondsToTime } from 'utils/dateTime';

import { SUITE_TESTS_HEADER_LABEL_MAPPING } from '../constants';

import Platforms from './Platforms';
import TestInfo from './TestInfo';

const ROW_STYLES = 'border-b border-base-200';

const SnPTestItem = ({ testDetails }) => {
  const dispatch = useDispatch();
  const handleViewMorePlatforms = () => {
    dispatch(
      setSHTestDetailsActiveTab({
        idx: 0,
        value: TEST_DETAILS_TABS.platforms
      })
    );
  };
  return (
    <>
      <O11yTableCell
        wrapperClassName={twClassNames(
          SUITE_TESTS_HEADER_LABEL_MAPPING.tests.defaultClass,
          ROW_STYLES
        )}
      >
        <TestInfo testDetails={testDetails} />
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          SUITE_TESTS_HEADER_LABEL_MAPPING.platforms.defaultClass,
          ROW_STYLES
        )}
      >
        <Platforms
          platforms={testDetails.platformList}
          browsers={testDetails.browserList}
          onViewMoreClick={handleViewMorePlatforms}
        />
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          SUITE_TESTS_HEADER_LABEL_MAPPING.totalFailures.defaultClass,
          ROW_STYLES
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
          SUITE_TESTS_HEADER_LABEL_MAPPING.reliability.defaultClass,
          ROW_STYLES
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
          SUITE_TESTS_HEADER_LABEL_MAPPING.average.defaultClass,
          ROW_STYLES
        )}
      >
        <div className="text-base-500 text-sm leading-5">
          {ReactHtmlParser(milliSecondsToTime(testDetails.duration, true))}
        </div>
      </O11yTableCell>
    </>
  );
};

SnPTestItem.propTypes = {
  testDetails: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SnPTestItem;
