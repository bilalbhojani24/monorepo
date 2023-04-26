import React, { useContext } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdOutlineAirplay,
  MdOutlineTimer,
  TooltipBody,
  TooltipHeader
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11yBadge,
  O11yButton,
  O11yHyperlink,
  O11yTooltip
} from 'common/bifrostProxy';
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
    dispatch(showTestDetailsDrawer(details.id));
  };

  const renderTag = (
    text,
    modifier,
    tooltipHeader = 'Tooltip Header',
    description = 'testing',
    onClick
  ) => {
    if (!text) return null;
    let filterCategory = '';
    let filterValue = '';
    switch (text) {
      case 'Flaky':
        filterCategory = 'flaky';
        filterValue = true;
        break;
      case 'Always Failing':
        filterCategory = 'history';
        filterValue = 'isAlwaysFailing';
        break;
      case 'New Failures':
        filterCategory = 'history';
        filterValue = 'isNewFailure';
        break;
      case 'Performance Anomaly':
        filterCategory = 'history';
        filterValue = 'isPerformanceAnomaly';
        break;
      default:
    }
    return (
      <PropagationBlocker className="ml-1 inline">
        <O11yTooltip
          placementSide="top"
          placementAlign="center"
          wrapperClassName="px-1"
          theme="dark"
          size="sm"
          onClick={() => onClick(filterCategory, filterValue)}
          content={
            <>
              <TooltipHeader>{tooltipHeader}</TooltipHeader>
              <TooltipBody>
                <div className="w-60 break-normal">
                  {description}
                  <div className="mt-3 flex gap-3">
                    <O11yButton>Configure</O11yButton>
                    <O11yButton wrapperClassName="bg-base-600 hover:bg-base-700 rounded py-1.5 px-3 text-white">
                      Learn More
                    </O11yButton>
                  </div>
                </div>
              </TooltipBody>
            </>
          }
        >
          <O11yBadge text={text} modifier={modifier} />
        </O11yTooltip>
      </PropagationBlocker>
    );
  };

  return (
    <div
      className="border-base-100 hover:bg-base-50 group cursor-pointer border-b pr-6 pt-1"
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
                <span>
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
                  {details?.isFlaky &&
                    renderTag(
                      'Flaky',
                      'warn',
                      `Flake detected in re-run within ${12}`,
                      `Test passing on a retry attempt in the same run 
                      across last ${1} consecutive runs`,
                      addFilterOnClick
                    )}
                  {details?.isAlwaysFailing &&
                    renderTag(
                      'Always Failing',
                      'error',
                      'Always failing test',
                      `The test has been failing with the same error for last ${1} consecutive runs`,
                      addFilterOnClick
                    )}
                  {details?.isNewFailure &&
                    renderTag(
                      'New Failures',
                      'error',
                      'New failure detected',
                      `This test failed for the first time across last ${1} consecutive runs`,
                      addFilterOnClick
                    )}
                  {details?.isPerformanceAnomaly &&
                    renderTag(
                      'Performance Anomaly',
                      'error',
                      'Performance anomaly detected',
                      `Duration is more than ${1}th percentile across last ${2} consecutive runs.`,
                      addFilterOnClick
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
            <TestListTimeline details={details} />
          </div>
          {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
          <div className="min-h-[34px] min-w-[100px]">
            <div className="flex content-end items-center justify-end pt-1 group-hover:hidden">
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

export default React.memo(RenderTestItem);

RenderTestItem.propTypes = {
  item: PropTypes.shape(singleItemTestDetails).isRequired
};
RenderTestItem.defaultProps = {};
