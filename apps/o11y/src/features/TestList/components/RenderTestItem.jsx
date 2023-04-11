import React, { useContext } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineAirplay, MdOutlineTimer } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yBadge, O11yHyperlink } from 'common/bifrostProxy';
import PropagationBlocker from 'common/PropagationBlocker';
import StatusIcon from 'common/StatusIcon';
import { TEST_STATUS } from 'constants/common';
import {
  HIERARCHY_SPACING,
  HIERARCHY_SPACING_START,
  LOG_TYPES,
  singleItemPropType,
  singleItemTestDetails
} from 'features/TestList/constants';
import { TestListContext } from 'features/TestList/context/TestListContext';
import { getAppliedFilters } from 'features/TestList/slices/selectors';
import { setAppliedFilters } from 'features/TestList/slices/testListSlice';
import PropTypes from 'prop-types';
import { transformUnsupportedTags } from 'utils/common';
import { milliSecondsToTime } from 'utils/dateTime';

import TestItemJiraTag from './TestItemJiraTag';
import TestListActionItems from './TestListActionItems';
import TestListDefectType from './TestListDefectType';
import TestListGalleryContainer from './TestListGalleryContainer';
import TestListStackTrace from './TestListStackTrace';
import TestListTimeline from './TestlistTimeline';

const RenderTestChildrens = ({ item: data, isLastItem }) => {
  const { displayName, details, rank } = data;
  const { tags, history } = useSelector(getAppliedFilters);
  const dispatch = useDispatch();
  const { o11yTestListingInteraction } = useContext(TestListContext);
  const addFilterOnClick = (filterCategory, filterValue) => {
    if (filterCategory === 'tags' && !tags.includes(filterValue)) {
      dispatch(
        setAppliedFilters({
          tags: [...tags, filterValue]
        })
      );
    } else if (filterCategory === 'history' && !history.includes(filterValue)) {
      dispatch(
        setAppliedFilters({
          history: [...history, filterValue]
        })
      );
    } else if (filterCategory === 'flaky' && !history.includes(filterValue)) {
      dispatch(
        setAppliedFilters({
          flaky: [filterValue]
        })
      );
    }
    o11yTestListingInteraction('filter_applied');
  };

  return (
    <div
      className={twClassNames(`border-base-100 border-b pt-2 pr-6`, {
        'pb-2': !isLastItem,
        'pb-4': isLastItem
      })}
      style={{
        paddingLeft: HIERARCHY_SPACING_START + HIERARCHY_SPACING * rank
      }}
    >
      <div className="flex justify-between">
        <div className="flex w-full flex-col items-center">
          <div className="flex items-center self-start">
            <div className="mt-1 flex items-center">
              <StatusIcon status={data.details.status || TEST_STATUS.SKIPPED} />
              <p className="text-base-900 ml-2 text-sm">
                {ReactHtmlParser(displayName, {
                  transform: transformUnsupportedTags
                })}
                {data?.details?.id}
              </p>
            </div>
            <div className="flex">
              {data?.details?.tags.map((singleTag) => (
                <PropagationBlocker className="ml-1" key={singleTag}>
                  <O11yBadge
                    text={singleTag}
                    wrapperClassName="mx-1"
                    hasRemoveButton={false}
                    onClick={() => {
                      addFilterOnClick('tags', singleTag);
                    }}
                    modifier="base"
                    hasDot={false}
                  />
                </PropagationBlocker>
              ))}
              {details?.isFlaky && (
                <PropagationBlocker className="ml-1">
                  <O11yBadge
                    text="Flaky"
                    modifier="warn"
                    onClick={() => {
                      addFilterOnClick('flaky', 'true');
                    }}
                  />
                </PropagationBlocker>
              )}
              {details?.isAlwaysFailing && (
                <PropagationBlocker className="ml-1">
                  <O11yBadge
                    text="Always Failing"
                    modifier="error"
                    onClick={() => {
                      addFilterOnClick('history', 'isAlwaysFailing');
                    }}
                  />
                </PropagationBlocker>
              )}
              {details?.isNewFailure && (
                <PropagationBlocker className="ml-1">
                  <O11yBadge
                    text="New Failures"
                    modifier="error"
                    onClick={() => {
                      addFilterOnClick('history', 'isNewFailure');
                    }}
                  />
                </PropagationBlocker>
              )}
              {details?.isPerformanceAnomaly && (
                <PropagationBlocker className="ml-1">
                  <O11yBadge
                    text="Performance Anomaly"
                    modifier="error"
                    onClick={() => {
                      addFilterOnClick('history', 'isPerformanceAnomaly');
                    }}
                  />
                </PropagationBlocker>
              )}
            </div>
            {details?.sessionUrl && (
              <PropagationBlocker className="mt-1">
                <O11yHyperlink
                  href={data?.details?.sessionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  wrapperClassName="ml-2"
                >
                  <MdOutlineAirplay className="text-base-500 h-4 w-4" />
                  <span className="text-base-500 ml-1 text-sm font-normal">
                    Interactive Session
                  </span>
                </O11yHyperlink>
              </PropagationBlocker>
            )}
          </div>
          <div className="flex items-center self-start">
            <TestListStackTrace details={details} />
          </div>
          <div className="flex items-center gap-3.5 self-start pl-6">
            <TestListDefectType data={data} />
            {details?.runCount > 1 && (
              <div>
                <p className="text-base-500 text-sm">
                  {details?.runCount} re-runs
                </p>
              </div>
            )}
            <PropagationBlocker variant="div">
              <TestListGalleryContainer
                imgUrl={
                  details?.retries[details?.retries.length - 1].logs[
                    LOG_TYPES.IMAGES
                  ]
                }
              />
            </PropagationBlocker>
            <TestItemJiraTag details={details} />
          </div>
        </div>
        <div className="flex w-auto">
          <div className="flex w-auto items-start">
            <TestListTimeline details={details} />
          </div>
          {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
          <div className="group min-h-[34px] min-w-[100px]">
            <div className="flex content-end items-center justify-end group-hover:hidden">
              <MdOutlineTimer className="text-base-500 block h-4 w-4" />
              <p className="text-base-500 ml-1 text-sm">
                {milliSecondsToTime(details?.duration)}
              </p>
            </div>
            <TestListActionItems details={details} />
          </div>
        </div>
      </div>
    </div>
  );
};

RenderTestChildrens.propTypes = {
  item: PropTypes.shape(singleItemPropType).isRequired
};

export default RenderTestChildrens;

RenderTestChildrens.propTypes = {
  item: PropTypes.shape(singleItemTestDetails).isRequired,
  isLastItem: PropTypes.bool.isRequired
};
RenderTestChildrens.defaultProps = {};
