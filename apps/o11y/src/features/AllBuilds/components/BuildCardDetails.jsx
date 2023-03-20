/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
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
import StatusBadges from 'common/StatusBadges';
import { DOC_KEY_MAPPING, TEST_STATUS } from 'constants/common';
import { getBuildMarkedStatus, getDocUrl } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

const aggregateColors = {
  'Automation Bug': '#8D51C2', // purple
  'Environment Issue': '#DBBD29', // yellow
  'No Defect': '#E25092', // pink
  'Product Bug': '#5C9EEB', // blue
  'To be Investigated': '#C47631' // brown
};

const FailureCategoriesTooltip = ({
  children,
  content,
  triggerWrapperClassName
}) => (
  <O11yTooltip
    theme="dark"
    placementSide="top"
    triggerWrapperClassName={triggerWrapperClassName}
    content={content}
  >
    {children}
  </O11yTooltip>
);

const BuildCardDetails = ({ data }) => {
  const widthAdjustmentRef = useRef([]);
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

  const handleChartClick = () => {
    // console.log(item)
  };

  const totalDefects = Object.values(data.issueTypeAggregate).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  useEffect(() => {
    widthAdjustmentRef.current.forEach((singleItem) => {
      const targetItem = singleItem;
      const { parentwidth } = targetItem.dataset;
      targetItem.parentNode.style.width = parentwidth;
    });
  });

  return (
    <>
      <O11yTableCell>
        <div className="flex">
          {renderStatusIcon()}
          <div className="ml-4">
            <div className="flex">
              <p className="text-base-900 text-sm font-medium leading-5">
                {data.originalName}
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
                <O11yBadge
                  key={singleTag}
                  wrapperClassName="mx-1"
                  hasRemoveButton={false}
                  modifier="base"
                  hasDot={false}
                  text={singleTag}
                />
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
        <StatusBadges statusStats={data.statusStats} />
      </O11yTableCell>
      <O11yTableCell>
        <O11yMetaData
          label={milliSecondsToTime(data.duration)}
          title="Duration"
        />
      </O11yTableCell>
      <O11yTableCell>
        <div className="flex overflow-hidden rounded-xl">
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
            Object.keys(data?.issueTypeAggregate)?.map((item, index) =>
              data?.issueTypeAggregate[item] ? (
                <FailureCategoriesTooltip
                  key={item}
                  triggerWrapperClassName=""
                  content={
                    <p className="text-base-100 px-2">
                      {item}:{' '}
                      {(
                        (data.issueTypeAggregate[item] * 100) /
                        totalDefects
                      ).toFixed(0)}
                      %
                    </p>
                  }
                >
                  <div
                    title={item}
                    label={item}
                    className="h-3"
                    tabIndex={0}
                    role="button"
                    data-parentwidth={`${
                      (data?.issueTypeAggregate[item] * 100) / totalDefects
                    }%`}
                    ref={(el) => {
                      widthAdjustmentRef.current[index] = el;
                      return null;
                    }}
                    onKeyDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.key === ' ' && e.key === 'Enter') {
                        handleChartClick(item);
                      }
                    }}
                    onClick={() => handleChartClick(item)}
                    style={{
                      backgroundColor: aggregateColors[item]
                    }}
                  />
                </FailureCategoriesTooltip>
              ) : null
            )
          )}
          {Object.values(data?.issueTypeAggregate)?.every(
            (item) => item === 0
          ) && (
            <FailureCategoriesTooltip
              triggerWrapperClassName="w-full"
              content={<p className="text-base-100 px-2">No Failures Found</p>}
            >
              <div
                id="pratik"
                label="No Failures Found"
                className="bg-base-200 h-3 w-full"
                tabIndex={0}
                role="button"
              />
            </FailureCategoriesTooltip>
          )}
        </div>
      </O11yTableCell>
      <O11yTableCell>
        <ul>
          {data?.historyAggregate?.isNewFailure > 0 && (
            <li className="text-danger-600">
              {`New Failures (${data?.historyAggregate?.isNewFailure})`}
            </li>
          )}
          {data?.historyAggregate?.isFlaky > 0 && (
            <li>{`Flaky (${data?.historyAggregate?.isFlaky})`}</li>
          )}
          {data?.historyAggregate?.isAlwaysFailing > 0 && (
            <li>{`Always Failing (${data?.historyAggregate?.isAlwaysFailing})`}</li>
          )}
          {data?.historyAggregate?.isPerformanceAnomaly > 0 && (
            <li>{`Performance Anomaly (${data?.historyAggregate?.isPerformanceAnomaly})`}</li>
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
