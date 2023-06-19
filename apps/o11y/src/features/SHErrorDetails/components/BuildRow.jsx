import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { MdOutlineAutoAwesome } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell } from 'common/bifrostProxy';
import JiraTag from 'common/JiraTag';
import PropagationBlocker from 'common/PropagationBlocker';
import SmartTagsToolTip from 'common/SmartTagsToolTip/SmartTagsToolTip';
import StatusChip from 'common/StatusChip';
import PropTypes from 'prop-types';
import { milliSecondsToTime } from 'utils/dateTime';

import { BUILDS_HEADER_COLUMN_STYLE_MAPPING } from '../constants';

import BuildInfo from './BuildInfo';

const BuildRow = ({ buildData }) => (
  <>
    <O11yTableCell
      wrapperClassName={twClassNames(
        BUILDS_HEADER_COLUMN_STYLE_MAPPING.buildName.defaultClass
      )}
    >
      <BuildInfo buildDetails={buildData} />
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames(
        BUILDS_HEADER_COLUMN_STYLE_MAPPING.testStatus.defaultClass
      )}
    >
      <StatusChip
        status={buildData.status}
        showDot={buildData.isFailedWithSameError}
      />
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames(
        BUILDS_HEADER_COLUMN_STYLE_MAPPING.failureCategory.defaultClass
      )}
    >
      <p className="flex items-center gap-1">
        {buildData?.issueType?.isAutoAnalyzed && (
          <MdOutlineAutoAwesome className="text-base-500 h-4 w-4" />
        )}
        <span className="">{buildData?.issueType?.value}</span>
      </p>
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames(
        BUILDS_HEADER_COLUMN_STYLE_MAPPING.testDuration.defaultClass
      )}
    >
      <div className="text-base-500 text-sm leading-5">
        {ReactHtmlParser(milliSecondsToTime(buildData.duration, true))}
      </div>
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames(
        BUILDS_HEADER_COLUMN_STYLE_MAPPING.tags.defaultClass
      )}
    >
      {!buildData.jiraUrl &&
      !buildData?.historyAggregate?.isFlaky &&
      !buildData?.historyAggregate?.isAlwaysFailing &&
      !buildData?.historyAggregate?.isNewFailure &&
      !buildData?.historyAggregate?.isPerformanceAnomaly ? (
        <span>-</span>
      ) : (
        <div className="flex flex-wrap gap-1">
          {buildData?.jiraUrl && (
            <PropagationBlocker className="inline">
              <JiraTag jiraUrl={buildData.jiraUrl || ''} />
            </PropagationBlocker>
          )}
          <PropagationBlocker className="flex flex-col gap-1">
            {buildData?.historyAggregate?.isFlaky && (
              <SmartTagsToolTip
                flakyReason={buildData.flakyReason}
                modifier="warn"
                onClick={() => {}}
                smartTagSettings={buildData?.smartTagSettings}
                text="Flaky"
                tooltipHeader="Flake detected"
              />
            )}
            {buildData?.historyAggregate?.isAlwaysFailing && (
              <SmartTagsToolTip
                modifier="error"
                isRounded={false}
                onClick={() => {}}
                smartTagSettings={buildData?.smartTagSettings}
                text="Always Failing"
                tooltipHeader="Always failing test"
              />
            )}
            {buildData?.historyAggregate?.isNewFailure && (
              <SmartTagsToolTip
                isRounded={false}
                modifier="error"
                onClick={() => {}}
                smartTagSettings={buildData?.smartTagSettings}
                text="New Failures"
                tooltipHeader="New failure detected"
              />
            )}

            {buildData?.historyAggregate?.isPerformanceAnomaly && (
              <SmartTagsToolTip
                isRounded={false}
                modifier="error"
                onClick={() => {}}
                smartTagSettings={buildData?.smartTagSettings}
                text="Performance Anomaly"
                tooltipHeader="Performance anomaly detected"
              />
            )}
          </PropagationBlocker>
        </div>
      )}
    </O11yTableCell>
  </>
);

BuildRow.propTypes = {
  buildData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default BuildRow;
