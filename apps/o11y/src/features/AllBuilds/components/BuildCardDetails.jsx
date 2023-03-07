/* eslint-disable react/prop-types */
import React from 'react';
// import { twClassNames } from '@browserstack/utils';
import {
  MdCancel,
  MdCheckCircle,
  MdHelp,
  MdOutlineAutoFixHigh,
  MdRemoveCircle
} from '@browserstack/bifrost';
import { O11yBadge, O11yTableCell, O11yTooltip } from 'common/bifrostProxy';
import MetaData from 'common/MetaData';
import O11yLoader from 'common/O11yLoader';
import { DOC_KEY_MAPPING, TEST_STATUS } from 'constants/common';
import { getBuildMarkedStatus, getDocUrl } from 'utils/common';

// PRATIK_TODO : renderStatusIcon pending color
// TEST_STATUS.PENDING,
// TEST_STATUS.SKIPPED,
// TEST_STATUS.default,

// PRATIK_TODO: update links

const aggregateColors = {
  'Automation Bug': '#8D51C2', // purple
  'Environment Issue': '#DBBD29', // yellow
  'No Defect': '#E25092', // pink
  'Product Bug': '#5C9EEB', // blue
  'To be Investigated': '#C47631' // brown
};

const BuildCardDetails = ({ data }) => {
  const renderStatusIcon = () => {
    const status = getBuildMarkedStatus(data.status, data.statusStats);
    if (TEST_STATUS.PENDING === status)
      return <MdHelp className="text-base-600 h-8 w-8 self-center p-1" />;
    if (TEST_STATUS.FAIL === status)
      return <MdCancel className="text-danger-600 h-8 w-8 self-center" />;
    if (TEST_STATUS.PASS === status)
      return <MdCheckCircle className="text-success-600 h-8 w-8 self-center" />;
    if (TEST_STATUS.UNKNOWN === status)
      return (
        <div className="h-8 w-8">
          <O11yLoader loaderClass="text-base-600 h-8 w-8 self-center p-1" />
        </div>
      );
    if (TEST_STATUS.SKIPPED === status)
      return (
        <MdRemoveCircle className="text-base-600 h-8 w-8 self-center p-1" />
      );
    return <MdHelp className="text-base-600 h-8 w-8 self-center p-1" />;
  };

  const handleChartClick = () => {
    // console.log(item)
  };

  const totalDefects = Object.values(data.issueTypeAggregate).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <>
      <O11yTableCell>
        <div className="flex">
          {renderStatusIcon()}
          <div className="ml-4">
            <div className="flex">
              <p className="text-base-900 text-sm font-medium leading-5">
                <MetaData label={data.originalName} title="Build Name" />
                {` `}
                <MetaData label={`#${data.buildNumber}`} title="Build Number" />
                {` `}
                {data.isAutoDetectedName && (
                  <O11yTooltip
                    theme="dark"
                    content={
                      <div className="mx-4">
                        <p className="text-base-300">
                          Static build name automatically detected:
                          {data.name}
                        </p>
                        <a
                          target="_new"
                          href={getDocUrl({
                            path: DOC_KEY_MAPPING.automation_build
                          })}
                          className="text-base-50 mt-2 block underline"
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
              {data.tags.map((singleTag) => (
                <MetaData
                  key={singleTag}
                  label={
                    <O11yBadge
                      wrapperClassName="mx-1"
                      hasRemoveButton={false}
                      modifier="base"
                      hasDot={false}
                      text={singleTag}
                    />
                  }
                  title="Build Tags"
                />
              ))}
            </div>
            <p className="text-base-500 text-sm">
              {/* PRATIK_TODO : handle Date */}
              Ran by <MetaData label={data.user} title="Triggered By" /> on{' '}
              <MetaData label={data.startedAt} title="Started At" />{' '}
              <span className="mx-2">
                <MdCancel className="text-danger-600 inline-block" />
                {/* PRATIK_TODO :JENKINS PHOTO MISSING */}
              </span>
              <a target="_new" href={data.versionControlInfo.url}>
                <MetaData
                  label={data.versionControlInfo.commitId.slice(0, 8)}
                  title="Commit ID"
                />
              </a>
            </p>
          </div>
        </div>
      </O11yTableCell>
      <O11yTableCell>
        <MetaData
          label={
            <O11yBadge
              wrapperClassName="mx-1"
              hasRemoveButton={false}
              modifier="success"
              hasDot={false}
              text={data.statusStats.passed}
            />
          }
          title="Cases Passed"
        />
        <MetaData
          label={
            <O11yBadge
              wrapperClassName="mx-1"
              hasRemoveButton={false}
              modifier="error"
              hasDot={false}
              text={data.statusStats.failed}
            />
          }
          title="Cases Failed"
        />
        <MetaData
          label={
            <O11yBadge
              wrapperClassName="mx-1"
              hasRemoveButton={false}
              modifier="base"
              hasDot={false}
              text={data.statusStats.skipped}
            />
          }
          title="Cases Skipped"
        />
        <MetaData
          label={
            <O11yBadge
              wrapperClassName="mx-1"
              hasRemoveButton={false}
              modifier="warn"
              hasDot={false}
              text={data.statusStats.timeout}
            />
          }
          title="Cases Timeout"
        />
      </O11yTableCell>
      {/* PRATIK_TODO : handle duration */}
      <O11yTableCell>
        <MetaData label={data.duration} title="Duration" />
      </O11yTableCell>
      <O11yTableCell>
        {/* PRATIK_TODO : tooltip width issue */}
        <div className="flex overflow-hidden rounded-xl">
          {Object.keys(data.issueTypeAggregate).map((item) =>
            data.issueTypeAggregate[item] ? (
              // <O11yTooltip
              //   key={item}
              //   placementSide="top"
              //   triggerWrapperClassName={twClassNames(`w-[${(data.issueTypeAggregate[item] * 100) / totalDefects}%]`)}
              //   content={
              //     <div className="">
              //       <span className="" style={{ backgroundColor: aggregateColors[item] }} />
              //       <span className="">{item}:</span>
              //       <span className="">
              //         {((data.issueTypeAggregate[item] * 100) / totalDefects)}
              //       </span>
              //     </div>
              //   }
              // >
              <div
                key={item}
                label={item}
                className="h-3"
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.key === ' ' && e.key === 'Enter') {
                    handleChartClick(item);
                  }
                }}
                onClick={() => handleChartClick(item)}
                style={{
                  backgroundColor: aggregateColors[item],
                  color: 'white',
                  width: `${
                    (data.issueTypeAggregate[item] * 100) / totalDefects
                  }%`
                }}
              />
            ) : // </O11yTooltip>
            null
          )}
        </div>
      </O11yTableCell>
      <O11yTableCell>
        <ul>
          {data.historyAggregate?.isNewFailure > 0 && (
            <li className="text-danger-600">
              <MetaData
                label={`New Failures (${data.historyAggregate?.isNewFailure})`}
                title="New Failures"
              />
            </li>
          )}
          {data.historyAggregate?.isFlaky > 0 && (
            <li>
              <MetaData
                label={`Flaky (${data.historyAggregate?.isFlaky})`}
                title="Flaky"
              />
            </li>
          )}
          {data.historyAggregate?.isAlwaysFailing > 0 && (
            <li>
              <MetaData
                label={`Always Failing (${data.historyAggregate?.isAlwaysFailing})`}
                title="Always Failing"
              />
            </li>
          )}
          {data.historyAggregate?.isPerformanceAnomaly > 0 && (
            <li>
              <MetaData
                label={`Performance Anomaly (${data.historyAggregate?.isPerformanceAnomaly})`}
                title="Performance Anomaly"
              />
            </li>
          )}
        </ul>
      </O11yTableCell>
    </>
  );
};

export default BuildCardDetails;
