/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MdAllInclusive,
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
import O11yLoader from 'common/O11yLoader';
import PropagationBlocker from 'common/PropagationBlocker';
import StatusBadges from 'common/StatusBadges';
import { DOC_KEY_MAPPING, TEST_STATUS } from 'constants/common';
import { getBuildMarkedStatus, getDocUrl } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

import { aggregateColors } from '../constants';
import { setAppliedFilters } from '../slices/dataSlice';
import { getAppliedFilters } from '../slices/selectors';

import DividedPill from './DividedPill';

const BuildCardDetails = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectNormalisedName } = useParams();
  const selectedFilters = useSelector(getAppliedFilters);
  const { tags } = selectedFilters;

  const renderStatusIcon = () => {
    const status = getBuildMarkedStatus(data.status, data.statusStats);
    if (TEST_STATUS.PENDING === status) {
      return (
        <div className="h-8 w-8">
          <O11yLoader loaderClass="text-base-500 h-8 w-8 self-center p-1" />
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
              <p className="text-base-900 text-sm font-medium leading-5">
                {data?.isAutoDetectedName ? data?.originalName : data?.name}
                {` `}
                <O11yMetaData
                  label={`#${data.buildNumber}`}
                  title="Build Number"
                />
                {` `}
                {data?.isAutoDetectedName && (
                  <O11yTooltip
                    theme="dark"
                    content={
                      <div className="mx-4">
                        <p className="text-base-300 text-sm leading-5">
                          Static build name automatically detected: {data.name}
                        </p>
                        <a
                          target="_new"
                          href={getDocUrl({
                            path: DOC_KEY_MAPPING.automation_build
                          })}
                          className="text-base-50 mt-2 block text-sm font-medium leading-5 underline"
                        >
                          Learn More
                        </a>
                      </div>
                    }
                  >
                    <MdOutlineAutoFixHigh className="text-base-500 mx-2 inline-block" />
                  </O11yTooltip>
                )}
              </p>
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
            <p className="text-base-500 text-sm">
              Ran by <O11yMetaData label={data?.user} title="Triggered By" /> on{' '}
              {data?.startedAt ? (
                <O11yMetaData
                  label={getCustomTimeStamp({
                    dateString: new Date(data.startedAt)
                  })}
                  title="Started At"
                />
              ) : null}{' '}
              <span className="mx-2">
                <MdAllInclusive className="text-base-600 inline-block" />
              </span>
              {data?.versionControlInfo ? (
                <O11yHyperlink
                  target="_new"
                  wrapperClassName="inline-block"
                  href={data?.versionControlInfo?.url}
                >
                  <O11yMetaData
                    label={`#
                    ${data?.versionControlInfo?.commitId?.slice(0, 8)}
                    `}
                    wrapperClassName="hover:text-brand-600 underline"
                    title="Commit ID"
                  />
                </O11yHyperlink>
              ) : null}
            </p>
          </div>
        </div>
      </O11yTableCell>
      <O11yTableCell>
        <PropagationBlocker>
          <StatusBadges
            statusStats={data.statusStats}
            onClickHandler={(clickData) =>
              navigateToTestPage('status', clickData)
            }
          />
        </PropagationBlocker>
      </O11yTableCell>
      <O11yTableCell>
        <O11yMetaData
          label={milliSecondsToTime(data.duration)}
          title="Duration"
        />
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
                    target="_new"
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
