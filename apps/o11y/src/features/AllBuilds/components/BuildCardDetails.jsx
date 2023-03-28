/* eslint-disable react/prop-types */
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
import VCIcon from 'common/VCIcon';
import { DOC_KEY_MAPPING, TEST_STATUS } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import { getBuildMarkedStatus, getDocUrl, logOllyEvent } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

import { aggregateColors } from '../constants';
import { setAppliedFilters } from '../slices/dataSlice';
import { getAppliedFilterTags } from '../slices/selectors';

import DividedPill from './DividedPill';

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
          <O11yLoader loaderClass="text-base-300 fill-base-400 h-8 w-8 self-center p-1" />
        </div>
      );
    }
    if (TEST_STATUS.FAIL === status)
      return <MdCancel className="text-danger-500 h-8 w-8 self-center" />;
    if (TEST_STATUS.PASS === status)
      return <MdCheckCircle className="text-success-500 h-8 w-8 self-center" />;
    if (TEST_STATUS.UNKNOWN === status)
      return <MdHelp className="text-attention-500 h-8 w-8 self-center" />;
    if (TEST_STATUS.SKIPPED === status)
      return <MdRemoveCircle className="text-base-500 h-8 w-8 self-center" />;
    return <MdHelp className="text-attention-500 h-8 w-8 self-center" />;
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

  // eslint-disable-next-line no-unused-vars
  const logBuildListingInteracted = ({ buildName, interaction }) => {
    logOllyEvent({
      event: 'O11yBuildListingInteracted',
      project_name: activeProject.name,
      build_name: buildName,
      interaction
    });
  };

  const navigateToTestPage = (itemCategory, clickData) => {
    let endpoint = `/projects/${projectNormalisedName}/builds/alertbuild/3?tab=tests`;
    endpoint += `&${itemCategory}=${clickData.itemClicked}`;
    navigate(endpoint);
  };

  return (
    <>
      <O11yTableCell>
        <div className="flex">
          {renderStatusIcon()}
          <div className="ml-4">
            <div className="flex">
              <div className="text-base-900 text-sm font-medium leading-5">
                <span className="text-base-900 text-sm font-medium leading-5">
                  {data?.isAutoDetectedName ? data?.originalName : data?.name}
                  &nbsp;
                </span>
                <O11yMetaData
                  textColorClass="text-base-500 inline-flex text-sm"
                  metaDescription={`#${data.buildNumber}`}
                  title="Build Number"
                />
                &nbsp;
                {data?.isAutoDetectedName && (
                  <O11yTooltip
                    theme="dark"
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
                        >
                          Learn more
                        </O11yHyperlink>
                      </div>
                    }
                  >
                    <MdOutlineAutoFixHigh className="text-base-500 mx-2 inline-block" />
                  </O11yTooltip>
                )}
              </div>
              {data?.tags.map((singleTag) => (
                <PropagationBlocker key={singleTag}>
                  <O11yBadge
                    wrapperClassName="mx-1"
                    hasRemoveButton={false}
                    onClick={() => addFilterTag(singleTag)}
                    modifier="base"
                    hasDot={false}
                    text={singleTag}
                  />
                </PropagationBlocker>
              ))}
            </div>
            <div className="text-base-500 text-sm">
              <span className="text-base-500 text-sm">Ran by </span>
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
              <div className="mx-1 inline-block">
                {data?.ciBuildData?.buildNumber && (
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
                )}
              </div>
              <div className="mx-1 inline-block">
                {data?.versionControlInfo?.url ? (
                  <PropagationBlocker variant="span">
                    <O11yHyperlink
                      target="_blank"
                      wrapperClassName="inline-block"
                      href={data?.versionControlInfo?.url}
                    >
                      <O11yMetaData
                        icon={
                          <VCIcon
                            url={data?.versionControlInfo?.url}
                            iconProps={{ className: 'h-5 w-5 m-auto' }}
                          />
                        }
                        textColorClass="hover:text-brand-700 text-base-500 inline-flex items-baseline text-sm underline font-normal"
                        metaDescription={`#${data?.versionControlInfo?.commitId?.slice(
                          0,
                          8
                        )}`}
                        title="Commit ID"
                      />
                    </O11yHyperlink>
                  </PropagationBlocker>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </O11yTableCell>
      <O11yTableCell>
        <PropagationBlocker>
          {data?.status && (
            <StatusBadges
              statusStats={data.statusStats}
              onClickHandler={(clickData) =>
                navigateToTestPage('status', clickData)
              }
            />
          )}
        </PropagationBlocker>
      </O11yTableCell>
      <O11yTableCell>
        {data.duration ? (
          <O11yMetaData
            textColorClass="text-base-500 inline-flex text-sm"
            metaDescription={milliSecondsToTime(data.duration)}
            title="Duration"
          />
        ) : null}
      </O11yTableCell>
      <O11yTableCell>
        <div>
          {Object.entries(data?.issueTypeAggregate)?.every(
            (item) =>
              (item[1] === 0 && item[0] !== 'To be Investigated') ||
              (item[1] !== 0 && item[0] === 'To be Investigated')
          ) ? (
            <O11yTooltip
              theme="dark"
              content={
                <div className="mx-4">
                  <p className="text-base-50 mb-2 text-sm font-medium">
                    Manual investigation yet to start
                  </p>
                  <p className="text-base-300 mb-2 text-sm">
                    Start tagging failures manually for Auto Analysis to kick-in
                  </p>
                  <O11yHyperlink
                    wrapperClassName="text-base-50 text-sm font-medium underline"
                    target="_blank"
                    href={getDocUrl({ path: DOC_KEY_MAPPING.auto_analyser })}
                  >
                    Learn more
                  </O11yHyperlink>
                </div>
              }
            >
              <p className="flex w-full justify-start">
                Investigation required
              </p>
            </O11yTooltip>
          ) : (
            <O11yTooltip
              size="lg"
              theme="light"
              placementSide="top"
              triggerWrapperClassName="flex overflow-hidden rounded-xl w-28"
              content={
                <div className="mx-4 w-96">
                  <div className="mb-2 flex overflow-hidden rounded-xl">
                    <DividedPill data={data} />
                  </div>
                  <ul>
                    {Object.keys(data?.issueTypeAggregate)?.map(
                      (item) =>
                        !!data?.issueTypeAggregate[item] && (
                          <li key={item}>
                            <span
                              className="mr-2 inline-block h-2 w-2 rounded-full"
                              style={{
                                backgroundColor: aggregateColors[item]
                              }}
                              data-d={data?.issueTypeAggregate[item]}
                            />
                            <span>{item}</span>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              }
            >
              <DividedPill data={data} />
            </O11yTooltip>
          )}
          {Object.values(data?.issueTypeAggregate)?.every(
            (item) => item === 0
          ) && (
            <div className="flex w-28 overflow-hidden rounded-xl">
              <O11yTooltip
                theme="dark"
                placementSide="top"
                triggerWrapperClassName="w-full"
                content={
                  <p className="text-base-100 px-2">No Failures Found</p>
                }
              >
                <div
                  id="pratik"
                  label="No Failures Found"
                  className="bg-base-200 h-3 w-full"
                  tabIndex={0}
                  role="button"
                />
              </O11yTooltip>
            </div>
          )}
        </div>
      </O11yTableCell>
      <O11yTableCell>
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
              {`New Failures (${data?.historyAggregate?.isNewFailure})`}
            </PropagationBlocker>
          )}
          {data?.historyAggregate?.isFlaky > 0 && (
            <PropagationBlocker
              variant="li"
              role="button"
              onClick={(e) =>
                navigateToTestPage('smartTags', {
                  eventData: e,
                  itemClicked: 'Flaky'
                })
              }
            >{`Flaky (${data?.historyAggregate?.isFlaky})`}</PropagationBlocker>
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
            >{`Always Failing (${data?.historyAggregate?.isAlwaysFailing})`}</PropagationBlocker>
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
            >{`Performance Anomaly (${data?.historyAggregate?.isPerformanceAnomaly})`}</PropagationBlocker>
          )}
          {Object.values(data?.historyAggregate).every((el) => el === 0) && (
            <li className="text-left">-</li>
          )}
        </ul>
      </O11yTableCell>
    </>
  );
};

export default BuildCardDetails;
