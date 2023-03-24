import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell } from 'common/bifrostProxy';
import JiraTag from 'common/JiraTag';
import PropagationBlocker from 'common/PropagationBlocker';
import StatusChip from 'common/StatusChip';
import TagsComponent from 'common/TagsComponent';
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
      <StatusChip status={buildData.status} />
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
          {buildData?.jiraUrl && (
            <PropagationBlocker className="inline">
              <JiraTag jiraUrl={buildData.jiraUrl || ''} />
            </PropagationBlocker>
          )}
          {buildData?.historyAggregate?.isFlaky && (
            <PropagationBlocker className="inline">
              <TagsComponent
                text="Flaky"
                wrapperClassName="pointer-events-none border-attention-200 bg-attention-50"
              />
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
