import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdCancel,
  MdCheckCircle,
  MdHelp,
  MdOutlineAutoFixHigh,
  MdRemoveCircle
} from '@browserstack/bifrost';
import {
  O11yBadge,
  O11yHyperlink,
  O11yMetaData,
  O11yTooltip
} from 'common/bifrostProxy';
import CiIcon from 'common/CiIcon';
import O11yLoader from 'common/O11yLoader';
import PropagationBlocker from 'common/PropagationBlocker';
import {
  DOC_KEY_MAPPING,
  TEST_LIST_FILTERS_TAGS,
  TEST_STATUS
} from 'constants/common';
import PropTypes from 'prop-types';
import { getBuildMarkedStatus, getDocUrl } from 'utils/common';
import { getCustomTimeStamp } from 'utils/dateTime';

import { BUILD_FILTER_OPERATIONS, BUILD_FILTER_TYPES } from '../constants';
import { getSelectedFiltersIdsByType } from '../slices/buildsSelectors';
import { setAppliedFilter } from '../slices/buildsSlice';

function BuildItemDetails({
  data,
  logBuildListingInteracted,
  navigateToTestPage
}) {
  const dispatch = useDispatch();
  const appliedFilterTags = useSelector(
    getSelectedFiltersIdsByType(BUILD_FILTER_TYPES.tags)
  );

  const renderStatusIcon = () => {
    const status = getBuildMarkedStatus(data.status, data.statusStats);
    if (TEST_STATUS.PENDING === status) {
      return (
        <div className="h-8 w-8">
          <O11yLoader loaderClass="flex-shrink-0 text-base-300 fill-base-400 h-8 w-8 self-center p-1" />
        </div>
      );
    }
    if (TEST_STATUS.FAIL === status)
      return (
        <MdCancel className="text-danger-500 h-8 w-8 shrink-0 self-center" />
      );
    if (TEST_STATUS.PASS === status)
      return (
        <MdCheckCircle className="text-success-500 h-8 w-8 shrink-0 self-center" />
      );
    if (TEST_STATUS.UNKNOWN === status)
      return (
        <MdHelp className="text-attention-500 h-8 w-8 shrink-0 self-center" />
      );
    if (TEST_STATUS.SKIPPED === status)
      return (
        <MdRemoveCircle className="text-base-500 h-8 w-8 shrink-0 self-center" />
      );
    return (
      <MdHelp className="text-attention-500  h-8 w-8 shrink-0 self-center" />
    );
  };

  const handleCIClicked = () => logBuildListingInteracted('ci_link_clicked');
  const buildCardNameClicked = () =>
    logBuildListingInteracted('build_name_card_clicked');
  const onAutoDetectLearnMoreClick = () =>
    logBuildListingInteracted('auto_detect_learn_more_clicked');
  const onAutoDetectHover = (isVisible) => {
    if (isVisible) {
      logBuildListingInteracted('auto_detect_hovered');
    }
  };

  const handleBuildTagFilter = (tagName) => {
    if (appliedFilterTags.includes(tagName)) {
      dispatch(
        setAppliedFilter({
          type: BUILD_FILTER_TYPES.tags,
          operation: BUILD_FILTER_OPERATIONS.REMOVE_BY_ID,
          id: tagName,
          text: tagName
        })
      );
    } else {
      dispatch(
        setAppliedFilter({
          type: BUILD_FILTER_TYPES.tags,
          operation: BUILD_FILTER_OPERATIONS.ADD,
          id: tagName,
          text: tagName,
          isApplied: true
        })
      );
    }
  };

  return (
    <div className="flex">
      {renderStatusIcon()}
      <div className="ml-4">
        <div
          role="presentation"
          className="text-base-900 w-full text-sm font-medium leading-5"
          onClick={buildCardNameClicked}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              buildCardNameClicked();
            }
          }}
        >
          {data?.isAutoDetectedName ? data?.originalName : data?.name}
          &nbsp;
          <O11yMetaData
            textColorClass="text-base-500 inline text-sm"
            metaDescription={`#${data.buildNumber}`}
            metaTitle="Build Number"
          />
          &nbsp;
          {data?.isAutoDetectedName && (
            <O11yTooltip
              theme="dark"
              onOpenChange={onAutoDetectHover}
              content={
                <div className="mx-4">
                  <p className="text-base-300 mb-2 text-sm">
                    Static build name automatically detected: {data?.name}
                  </p>
                  <O11yHyperlink
                    wrapperClassName="text-base-50 text-sm font-medium underline"
                    target="_blank"
                    href={getDocUrl({
                      path: DOC_KEY_MAPPING.automation_build
                    })}
                    onClick={onAutoDetectLearnMoreClick}
                  >
                    Learn more
                  </O11yHyperlink>
                </div>
              }
            >
              <MdOutlineAutoFixHigh className="text-base-500 mx-2 inline-block" />
            </O11yTooltip>
          )}
          {data?.tags.map((singleTag) => (
            <PropagationBlocker variant="span" key={singleTag}>
              <O11yBadge
                wrapperClassName="mx-1 flex-shrink-0 bg-base-200"
                hasRemoveButton={false}
                onClick={() => handleBuildTagFilter(singleTag)}
                modifier="base"
                hasDot={false}
                text={singleTag}
              />
            </PropagationBlocker>
          ))}
        </div>
        <div className="text-base-500 text-sm leading-6">
          <span className="text-base-500 text-sm">Run by </span>
          <O11yMetaData
            textColorClass="text-base-500 inline-flex text-sm"
            metaDescription={data?.user}
            metaTitle="Run By"
          />
          <span className="text-base-500 text-sm"> on </span>
          {data?.startedAt ? (
            <O11yMetaData
              textColorClass="text-base-500 inline-flex text-sm"
              metaDescription={getCustomTimeStamp({
                dateString: new Date(data.startedAt)
              })}
              metaTitle="Started At"
            />
          ) : null}{' '}
          {data?.ciBuildData?.buildNumber && (
            <div className="mx-1 inline-block">
              <PropagationBlocker variant="span">
                <O11yTooltip
                  theme="dark"
                  placementSide="bottom"
                  triggerWrapperClassName="mr-2 inline-flex items-end"
                  wrapperClassName="py-2"
                  content={
                    <>
                      {data?.ciBuildData?.jobName ? (
                        <div className="mx-4">
                          <p className="text-base-300 text-sm">
                            Job name: {data?.ciBuildData?.jobName}
                          </p>
                        </div>
                      ) : null}
                    </>
                  }
                >
                  <O11yHyperlink
                    target="_blank"
                    href={data?.ciBuildData?.buildUrl}
                    onClick={handleCIClicked}
                  >
                    <O11yMetaData
                      icon={
                        <CiIcon
                          name={data?.ciBuildData?.name}
                          iconProps={{ className: 'h-5 w-5 m-auto' }}
                        />
                      }
                      metaDescription={`${data?.ciBuildData.name} ${data?.ciBuildData?.buildNumber}`}
                      textColorClass="hover:text-brand-700 text-base-500 inline-flex items-baseline text-sm font-normal"
                    />
                  </O11yHyperlink>
                </O11yTooltip>
              </PropagationBlocker>
            </div>
          )}
          {data?.historyAggregate?.isFlaky > 0 && (
            <PropagationBlocker className="mr-2 inline">
              <O11yBadge
                onClick={(e) =>
                  navigateToTestPage('flaky', {
                    eventData: e,
                    itemClicked: true,
                    redirectViaCategory: true
                  })
                }
                hasRemoveButton={false}
                modifier="warn"
                hasDot={false}
                text={`Flaky (${data?.historyAggregate?.isFlaky})`}
              />
            </PropagationBlocker>
          )}
          {data?.historyAggregate?.isNewFailure > 0 && (
            <PropagationBlocker className="mr-2 inline">
              <O11yBadge
                onClick={(e) => {
                  navigateToTestPage('history', {
                    eventData: e,
                    itemClicked: TEST_LIST_FILTERS_TAGS.isNewFailure
                  });
                }}
                hasRemoveButton={false}
                modifier="error"
                hasDot={false}
                text={`New Failures (${data?.historyAggregate?.isNewFailure})`}
              />
            </PropagationBlocker>
          )}
          {data?.historyAggregate?.isAlwaysFailing > 0 && (
            <PropagationBlocker className="mr-2 inline">
              <O11yBadge
                onClick={(e) =>
                  navigateToTestPage('history', {
                    eventData: e,
                    itemClicked: TEST_LIST_FILTERS_TAGS.isAlwaysFailing
                  })
                }
                hasRemoveButton={false}
                modifier="error"
                hasDot={false}
                text={`Always Failing (${data?.historyAggregate?.isAlwaysFailing})`}
              />
            </PropagationBlocker>
          )}
          {data?.historyAggregate?.isPerformanceAnomaly > 0 && (
            <PropagationBlocker className="mr-2 inline">
              <O11yBadge
                wrapperClassName="text-xs py-0 font-medium"
                onClick={(e) =>
                  navigateToTestPage('history', {
                    eventData: e,
                    itemClicked: TEST_LIST_FILTERS_TAGS.isPerformanceAnomaly
                  })
                }
                hasRemoveButton={false}
                modifier="error"
                hasDot={false}
                text={`Performance Anomaly (${data?.historyAggregate?.isPerformanceAnomaly})`}
              />
            </PropagationBlocker>
          )}
        </div>
      </div>
    </div>
  );
}

BuildItemDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  logBuildListingInteracted: PropTypes.func.isRequired,
  navigateToTestPage: PropTypes.func.isRequired
};

export default BuildItemDetails;
