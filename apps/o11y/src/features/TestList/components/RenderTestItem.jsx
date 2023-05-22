import React, { useContext } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineAirplay, MdOutlineTimer } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yBadge, O11yHyperlink } from 'common/bifrostProxy';
import PropagationBlocker from 'common/PropagationBlocker';
import StatusIcon from 'common/StatusIcon';
import { TEST_STATUS } from 'constants/common';
import { showTestDetailsDrawer } from 'features/TestDetails/utils';
import {
  HIERARCHY_SPACING,
  HIERARCHY_SPACING_START,
  HIERARCHY_TEST_ADDITIONAL_SPACING,
  LOG_TYPES,
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

const RenderTestItem = ({ item: data }) => {
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

  const handleClickTestItem = () => {
    if (data.isBeforeAllHook || data.isAfterAllHook) return;
    dispatch(showTestDetailsDrawer(details.id));
  };

  return (
    <div
      className={twClassNames(
        'border-base-100 hover:bg-base-50 group cursor-pointer border-b pr-6 pt-1',
        {
          'cursor-default': data.isBeforeAllHook || data.isAfterAllHook
        }
      )}
      style={{
        paddingLeft:
          HIERARCHY_SPACING_START +
          HIERARCHY_TEST_ADDITIONAL_SPACING +
          HIERARCHY_SPACING * rank
      }}
      role="presentation"
      onClick={handleClickTestItem}
    >
      <div className="flex justify-between gap-4">
        <div className="flex w-full flex-col items-start pt-1">
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex h-5 items-center ">
                <StatusIcon
                  status={data.details.status || TEST_STATUS.SKIPPED}
                />
              </div>
              <div className="text-base-900 ml-2 text-sm">
                <span
                  className={twClassNames('', {
                    'text-base-500': data.isBeforeAllHook || data.isAfterAllHook
                  })}
                >
                  {data.isBeforeAllHook ? 'Before Hook: ' : ''}
                  {data.isAfterAllHook ? 'After Hook: ' : ''}
                  {ReactHtmlParser(displayName, {
                    transform: transformUnsupportedTags
                  })}
                </span>
                <div className="ml-1 inline shrink-0">
                  {data?.details?.tags.map((singleTag) => (
                    <PropagationBlocker className="ml-1 inline" key={singleTag}>
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
                    <PropagationBlocker className="ml-1 inline">
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
                    <PropagationBlocker className="ml-1 inline">
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
                    <PropagationBlocker className="ml-1 inline">
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
                    <PropagationBlocker className="ml-1 inline">
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
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <TestListStackTrace details={details} size="5xl" />
          </div>
          <div
            className={twClassNames('flex items-center gap-2 pl-6', {
              'mt-1':
                !details.retries?.length ||
                !details.retries[details.retries.length - 1].logs?.[
                  LOG_TYPES.STACKTRACE
                ]?.length
            })}
          >
            <TestListDefectType data={data} />
            {details?.runCount > 1 && (
              <div>
                <p className="text-base-500 mb-2 text-sm ">
                  {details?.runCount} runs
                </p>
              </div>
            )}
            {!!details?.retries[details?.retries.length - 1].logs[
              LOG_TYPES.IMAGES
            ] && (
              <TestListGalleryContainer
                imgUrl={
                  details?.retries[details?.retries.length - 1].logs[
                    LOG_TYPES.IMAGES
                  ]
                }
              />
            )}
            <TestItemJiraTag details={details} />
            {details?.sessionUrl && (
              <PropagationBlocker className="mb-2 inline-flex ">
                <O11yHyperlink
                  href={data?.details?.sessionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  wrapperClassName="inline-flex hover:text-brand-600"
                >
                  <MdOutlineAirplay className="text-base" />
                  <span className="ml-1 text-sm font-normal">
                    Interactive Session
                  </span>
                </O11yHyperlink>
              </PropagationBlocker>
            )}
          </div>
        </div>
        <div className="flex w-auto gap-1">
          <div className="flex w-auto items-start pt-1">
            <TestListTimeline
              details={details}
              isHook={data.isAfterAllHook || data.isBeforeAllHook}
            />
          </div>
          {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
          <div className="min-h-[34px] min-w-[100px]">
            <div className="flex content-end items-center justify-end pt-1 group-hover:hidden">
              <MdOutlineTimer className="text-base-500 block h-4 w-4" />
              <p className="text-base-500 ml-1 text-sm">
                {milliSecondsToTime(details?.duration)}
              </p>
            </div>
            <TestListActionItems
              details={details}
              isMutedHidden={data.isBeforeAllHook || data.isAfterAllHook}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RenderTestItem);

RenderTestItem.propTypes = {
  item: PropTypes.shape(singleItemTestDetails).isRequired
};
RenderTestItem.defaultProps = {};
