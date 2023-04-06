import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MdCancel,
  MdCheckCircle,
  MdHelp,
  MdOutlineAutoFixHigh,
  MdRemoveCircle
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11yBadge,
  O11yHyperlink,
  O11yMetaData,
  O11yTableCell,
  O11yTooltip
} from 'common/bifrostProxy';
import CiIcon from 'common/CiIcon';
import O11yLoader from 'common/O11yLoader';
import PropagationBlocker from 'common/PropagationBlocker';
import StatusBadges from 'common/StatusBadges';
import { DOC_KEY_MAPPING, TEST_STATUS } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { getBuildMarkedStatus, getDocUrl, logOllyEvent } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

import { TABLE_CLASSES } from '../constants';
import { setAppliedFilters } from '../slices/dataSlice';
import { getAppliedFilterTags } from '../slices/selectors';

import FailureCategoriesPill from './FailureCategoriesPill';

const BuildCardDetails = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectNormalisedName } = useParams();
  const tags = useSelector(getAppliedFilterTags);
  const activeProject = useSelector(getActiveProject);

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

  const addFilterTag = (item) => {
    if (!tags.includes(item)) {
      dispatch(
        setAppliedFilters({
          tags: [...tags, item]
        })
      );
    }
  };

  const logBuildListingInteracted = (interaction) => {
    logOllyEvent({
      event: 'O11yBuildListingInteracted',
      project_name: activeProject.name,
      build_name: data?.isAutoDetectedName ? data?.originalName : data?.name,
      interaction
    });
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

  const navigateToTestPage = (itemCategory, clickData) => {
    const interactionName = `${clickData.itemClicked
      .replace(' ', '_')
      .toLowerCase()}_clicked`;
    logBuildListingInteracted(interactionName);
    let endpoint = `/projects/${projectNormalisedName}/builds/${
      data?.isAutoDetectedName ? data?.originalName : data?.name
    }/${data?.buildNumber}?tab=tests`;
    endpoint += `&${itemCategory}=${clickData.itemClicked}`;
    navigate(endpoint);
  };

  return (
    <>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.BUILD,
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
        <div className="flex">
          {renderStatusIcon()}
          <div className="ml-4">
            <div className="flex">
              <div className="text-base-900 w-full text-sm font-medium leading-5">
                <span
                  role="presentation"
                  className="text-base-900 text-sm font-medium leading-5"
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
                    textColorClass="text-base-500 inline-flex text-sm"
                    metaDescription={`#${data.buildNumber}`}
                    title="Build Number"
                  />
                  &nbsp;
                  {!data?.isAutoDetectedName && (
                    <O11yTooltip
                      theme="dark"
                      onOpenChange={onAutoDetectHover}
                      content={
                        <div className="mx-4">
                          <p className="text-base-300 mb-2 text-sm">
                            Static build name automatically detected:{' '}
                            {data?.isAutoDetectedName
                              ? data?.originalName
                              : data?.name}
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
                        wrapperClassName="mx-1 flex-shrink-0"
                        hasRemoveButton={false}
                        onClick={() => addFilterTag(singleTag)}
                        modifier="base"
                        hasDot={false}
                        text={singleTag}
                      />
                    </PropagationBlocker>
                  ))}
                </span>
              </div>
            </div>
            <div className="text-base-500 text-sm leading-6">
              <span className="text-base-500 text-sm">Run by </span>
              <O11yMetaData
                textColorClass="text-base-500 inline-flex text-sm"
                metaDescription={data?.user}
                title="Triggered By"
              />
              <span className="text-base-500 text-sm"> on </span>
              {data?.startedAt ? (
                <O11yMetaData
                  textColorClass="text-base-500 inline-flex text-sm"
                  metaDescription={getCustomTimeStamp({
                    dateString: new Date(data.startedAt)
                  })}
                  title="Started At"
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
                        href={data?.versionControlInfo?.url}
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
            </div>
          </div>
        </div>
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.TEST,
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
        <PropagationBlocker>
          {data?.status && (
            <StatusBadges
              isSmallBadges
              statusStats={data.statusStats}
              onClickHandler={(clickData) =>
                navigateToTestPage('status', clickData)
              }
            />
          )}
        </PropagationBlocker>
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.DURATION,
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
        {data.duration ? (
          <O11yMetaData
            textColorClass="text-base-500 inline-flex text-sm"
            metaDescription={milliSecondsToTime(data.duration)}
            title="Duration"
          />
        ) : null}
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.FAILURE_CATEGORY,
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
        <FailureCategoriesPill
          data={data}
          logBuildListingInteracted={logBuildListingInteracted}
        />
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.COL.SMART_TAGS,
          TABLE_CLASSES.ROW_CLASSES
        )}
      >
        <ul>
          {data?.historyAggregate?.isNewFailure > 0 && (
            <PropagationBlocker
              variant="li"
              role="button"
              onClick={(e) =>
                navigateToTestPage('smartTags', {
                  eventData: e,
                  itemClicked: 'New Failure'
                })
              }
              className="text-danger-600"
            >
              {`New Failures(${data?.historyAggregate?.isNewFailure})`}
            </PropagationBlocker>
          )}
          {data?.historyAggregate?.isFlaky > 0 && (
            <PropagationBlocker
              variant="li"
              role="button"
              onClick={(e) =>
                navigateToTestPage('smartTags', {
                  eventData: e,
                  itemClicked: 'flaky'
                })
              }
            >{`Flaky(${data?.historyAggregate?.isFlaky})`}</PropagationBlocker>
          )}
          {data?.historyAggregate?.isAlwaysFailing > 0 && (
            <PropagationBlocker
              variant="li"
              role="button"
              onClick={(e) =>
                navigateToTestPage('smartTags', {
                  eventData: e,
                  itemClicked: 'Always Failing'
                })
              }
            >{`Always Failing(${data?.historyAggregate?.isAlwaysFailing})`}</PropagationBlocker>
          )}
          {data?.historyAggregate?.isPerformanceAnomaly > 0 && (
            <PropagationBlocker
              variant="li"
              role="button"
              onClick={(e) =>
                navigateToTestPage('smartTags', {
                  eventData: e,
                  itemClicked: 'Performance Anomaly'
                })
              }
            >{`Performance Anomaly(${data?.historyAggregate?.isPerformanceAnomaly})`}</PropagationBlocker>
          )}
          {Object.values(data?.historyAggregate).every((el) => el === 0) && (
            <li className="text-left">-</li>
          )}
        </ul>
      </O11yTableCell>
    </>
  );
};

BuildCardDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};

export default BuildCardDetails;
