import React, { useContext } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { DOC_KEY_MAPPING, TEST_STATUS } from 'constants/common';
import { ROUTES } from 'constants/routes';
import {
  ADV_FILTER_OPERATIONS,
  ADV_FILTER_TYPES
} from 'features/FilterSkeleton/constants';
import { showTestDetailsDrawer } from 'features/TestDetails/utils';
import {
  HIERARCHY_SPACING,
  HIERARCHY_SPACING_START,
  HIERARCHY_TEST_ADDITIONAL_SPACING,
  LOG_TYPES,
  singleItemTestDetails
} from 'features/TestList/constants';
import { TestListContext } from 'features/TestList/context/TestListContext';
import { getTestList } from 'features/TestList/slices/selectors';
import PropTypes from 'prop-types';
import { getDocUrl, transformUnsupportedTags } from 'utils/common';
import { milliSecondsToTime } from 'utils/dateTime';

import { dispatchAppliedFilter } from '../utils';

import TestItemJiraTag from './TestItemJiraTag';
import TestListActionItems from './TestListActionItems';
import TestListDefectType from './TestListDefectType';
import TestListGalleryContainer from './TestListGalleryContainer';
import TestListStackTrace from './TestListStackTrace';
import TestListTimeline from './TestlistTimeline';

const RenderTestItem = ({ item: data }) => {
  const { displayName, details, rank } = data;
  const { data: testListData } = useSelector(getTestList);
  const {
    smartTagSettings: { flaky, alwaysFailing, newFailure, performanceAnomalies }
  } = testListData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { o11yTestListingInteraction } = useContext(TestListContext);

  const addFilterOnClick = (filterCategory, filterValue) => {
    switch (filterCategory) {
      case ADV_FILTER_TYPES.testTags.key: {
        dispatchAppliedFilter({
          type: filterCategory,
          dispatch,
          value: filterValue,
          customOperation: ADV_FILTER_OPERATIONS.REPLACE_BY_TYPE
        });
        break;
      }
      case ADV_FILTER_TYPES.isFlaky.key:
      case ADV_FILTER_TYPES.isAlwaysFailing.key:
      case ADV_FILTER_TYPES.isNewFailure.key:
      case ADV_FILTER_TYPES.hasPerformanceAnomaly.key:
        dispatchAppliedFilter({
          type: filterCategory,
          dispatch,
          value: true,
          customOperation: ADV_FILTER_OPERATIONS.REPLACE_BY_TYPE
        });
        break;
      default:
        break;
    }
    o11yTestListingInteraction('filter_applied');
  };

  const handleClickTestItem = () => {
    dispatch(showTestDetailsDrawer(details.id));
  };

  const handleClickConfigureSmartTags = () => {
    navigate(ROUTES.smart_tags);
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
        filterCategory = ADV_FILTER_TYPES.isFlaky.key;
        filterValue = true;
        break;
      case 'Always Failing':
        filterCategory = ADV_FILTER_TYPES.isAlwaysFailing.key;
        filterValue = true;
        break;
      case 'New Failures':
        filterCategory = ADV_FILTER_TYPES.isNewFailure.key;
        filterValue = true;
        break;
      case 'Performance Anomaly':
        filterCategory = ADV_FILTER_TYPES.hasPerformanceAnomaly.key;
        filterValue = true;
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
          content={
            <>
              <TooltipHeader>{tooltipHeader}</TooltipHeader>
              <TooltipBody>
                <div className="w-60 break-normal">
                  {description}
                  <div className="mt-3 flex gap-3">
                    <O11yButton onClick={handleClickConfigureSmartTags}>
                      Configure
                    </O11yButton>
                    <O11yButton
                      wrapperClassName="bg-base-600 hover:bg-base-700 rounded py-1.5 px-3 text-white"
                      onClick={() =>
                        window.open(
                          `${getDocUrl({
                            path: DOC_KEY_MAPPING.smart_tags
                          })}#${text.toLowerCase()}`,
                          '_blank',
                          'noopener,noreferrer'
                        )
                      }
                    >
                      Learn More
                    </O11yButton>
                  </div>
                </div>
              </TooltipBody>
            </>
          }
        >
          <O11yBadge
            text={text}
            modifier={modifier}
            onClick={() => {
              onClick(filterCategory, filterValue);
            }}
          />
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
        <div className="flex w-full flex-col items-start break-words pt-1">
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
                          addFilterOnClick(
                            ADV_FILTER_TYPES.testTags.key,
                            singleTag
                          );
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
                      'Flake detected',
                      details?.flakyReason === 1
                        ? `Test status has flipped more than ${flaky?.flakeInHistory.flippingCount}
                      times in the last ${flaky?.flakeInHistory.consecutiveRuns} consecutive runs.`
                        : `Test passes on a retry within the last ${flaky?.flakeInRerun.consecutiveRuns} runs.`,
                      addFilterOnClick
                    )}
                  {details?.isAlwaysFailing &&
                    renderTag(
                      'Always Failing',
                      'error',
                      'Always failing test',
                      `The test has been failing with the ${
                        alwaysFailing?.failureType === 'SAME'
                          ? 'same error'
                          : 'any error'
                      } for the last ${
                        alwaysFailing?.consecutiveRuns
                      } consecutive runs.`,
                      addFilterOnClick
                    )}
                  {details?.isNewFailure &&
                    renderTag(
                      'New Failures',
                      'error',
                      'New failure detected',
                      `The test has failed with a ${
                        newFailure?.failureType === 'NEW' ? 'new' : 'any'
                      } error for the first time among the last ${
                        newFailure?.consecutiveRuns
                      } runs.`,
                      addFilterOnClick
                    )}
                  {details?.isPerformanceAnomaly &&
                    renderTag(
                      'Performance Anomaly',
                      'error',
                      'Performance anomaly detected',
                      `Test execution duration exceeding the 
                      ${performanceAnomalies?.durationPercentile}
                      percentile duration among the last ${performanceAnomalies?.consecutiveRuns} runs of the same test.`,
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
