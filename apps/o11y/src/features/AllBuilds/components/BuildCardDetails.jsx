/* eslint-disable react/prop-types */
import React from 'react';
// import { twClassNames } from '@browserstack/utils';
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
  O11yMetaData,
  O11yTableCell,
  O11yTooltip
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
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

const BuildCardDetails = ({ data }) => {
  const renderStatusIcon = () => {
    const status = getBuildMarkedStatus(data.status, data.statusStats);
    if (TEST_STATUS.PENDING === status) {
      return (
        <div className="h-8 w-8">
          <O11yLoader loaderClass="text-base-600 h-8 w-8 self-center p-1" />
        </div>
      );
    }
    if (TEST_STATUS.FAIL === status)
      return <MdCancel className="text-danger-600 h-8 w-8 self-center" />;
    if (TEST_STATUS.PASS === status)
      return <MdCheckCircle className="text-success-600 h-8 w-8 self-center" />;
    if (TEST_STATUS.UNKNOWN === status)
      return <MdHelp className="text-attention-600 h-8 w-8 self-center p-1" />;
    if (TEST_STATUS.SKIPPED === status)
      return (
        <MdRemoveCircle className="text-base-500 h-8 w-8 self-center p-1" />
      );
    return <MdHelp className="text-attention-500 h-8 w-8 self-center p-1" />;
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
                {data.originalName}
                {` `}
                <O11yMetaData
                  label={`#${data.buildNumber}`}
                  title="Build Number"
                />
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
              Ran by <O11yMetaData label={data.user} title="Triggered By" /> on{' '}
              {data.startedAt ? (
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
              {data.versionControlInfo ? (
                <a target="_new" href={data?.versionControlInfo?.url}>
                  <O11yMetaData
                    label={data?.versionControlInfo?.commitId.slice(0, 8)}
                    title="Commit ID"
                  />
                </a>
              ) : null}
            </p>
          </div>
        </div>
      </O11yTableCell>
      <O11yTableCell>
        <O11yBadge
          wrapperClassName="mx-1"
          hasRemoveButton={false}
          modifier="success"
          hasDot={false}
          text={data.statusStats.passed || 0}
        />
        <O11yBadge
          wrapperClassName="mx-1"
          hasRemoveButton={false}
          modifier="error"
          hasDot={false}
          text={data.statusStats.failed || 0}
        />
        <O11yBadge
          wrapperClassName="mx-1"
          hasRemoveButton={false}
          modifier="base"
          hasDot={false}
          text={data.statusStats.skipped || 0}
        />
        <O11yBadge
          wrapperClassName="mx-1"
          hasRemoveButton={false}
          modifier="warn"
          hasDot={false}
          text={data.statusStats.timeout || 0}
        />
      </O11yTableCell>
      <O11yTableCell>{milliSecondsToTime(data.duration)}</O11yTableCell>
      <O11yTableCell>
        <div className="flex overflow-hidden rounded-xl">
          {/* PRATIK_TODO : TO BE INVESTIGATED */}
          {Object.keys(data?.issueTypeAggregate)?.map((item) =>
            data.issueTypeAggregate[item] ? (
              // <O11yTooltip
              //   key={item}
              //   placementSide="top"
              //   triggerWrapperClassName={twClassNames(
              //     `w-[${(data.issueTypeAggregate[item] * 100) / totalDefects}%]`
              //   )}
              //   content={
              //     <div className="">
              //       <span
              //         className=""
              //         style={{ backgroundColor: aggregateColors[item] }}
              //       />
              //       <span className="">{item}:</span>
              //       <span className="">
              //         {(data.issueTypeAggregate[item] * 100) / totalDefects}
              //       </span>
              //     </div>
              //   }
              // >
              <div
                title={item}
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
              {`New Failures (${data.historyAggregate?.isNewFailure})`}
            </li>
          )}
          {data.historyAggregate?.isFlaky > 0 && (
            <li>{`Flaky (${data.historyAggregate?.isFlaky})`}</li>
          )}
          {data.historyAggregate?.isAlwaysFailing > 0 && (
            <li>{`Always Failing (${data.historyAggregate?.isAlwaysFailing})`}</li>
          )}
          {data.historyAggregate?.isPerformanceAnomaly > 0 && (
            <li>{`Performance Anomaly (${data.historyAggregate?.isPerformanceAnomaly})`}</li>
          )}
        </ul>
      </O11yTableCell>
    </>
  );
};

export default BuildCardDetails;
