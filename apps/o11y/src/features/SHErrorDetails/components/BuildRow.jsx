import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { MdOutlineAutoAwesome } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yBadge, O11yTableCell } from 'common/bifrostProxy';
import { JiraTagList } from 'common/JiraTag';
import PropagationBlocker from 'common/PropagationBlocker';
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
      {!buildData.jiraUrl && !buildData?.historyAggregate?.isFlaky ? (
        <span>-</span>
      ) : (
        <div className="flex flex-wrap gap-1">
          {Array.isArray(buildData?.jiraUrl) && (
            <PropagationBlocker className="inline">
              <JiraTagList list={buildData.jiraUrl || []} showInToolTip />
            </PropagationBlocker>
          )}
          {buildData?.historyAggregate?.isFlaky && (
            <PropagationBlocker className="inline">
              <O11yBadge text="Flaky" modifier="warn" />
            </PropagationBlocker>
          )}
        </div>
      )}
    </O11yTableCell>
  </>
);

BuildRow.propTypes = {
  buildData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default BuildRow;
