import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  MdCancel,
  MdCheckCircle,
  MdHelp,
  MdRemoveCircle
} from '@browserstack/bifrost';
import { O11yBadge } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import PropagationBlocker from 'common/PropagationBlocker/PropagationBlocker';
import StatusBadges from 'common/StatusBadges';
import { TEST_STATUS } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { getBuildMarkedStatus } from 'utils/common';
import { getCustomTimeStamp } from 'utils/dateTime';
import { getBuildPath } from 'utils/routeUtils';

export default function UniqueBuildItem({ data }) {
  const navigate = useNavigate();
  const activeProject = useSelector(getActiveProject);
  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(
      getBuildPath(
        activeProject.normalisedName,
        data?.normalisedName,
        data?.buildNumber
      )
    );
  };
  const handleTagClick = (itemCategory, itemClicked) => {
    navigate(
      `${getBuildPath(
        activeProject.normalisedName,
        data?.normalisedName,
        data?.buildNumber
      )}?tab=tests&${itemCategory}=${itemClicked}`
    );
  };

  const renderStatusIcon = () => {
    const status = getBuildMarkedStatus(data.status, data.statusStats);
    if (TEST_STATUS.PENDING === status) {
      return (
        <div className="h-6 w-6">
          <O11yLoader loaderClass="text-base-300 fill-base-400 h-6 w-6 self-center p-1" />
        </div>
      );
    }
    if (TEST_STATUS.FAIL === status)
      return <MdCancel className="text-danger-500 h-6 w-6 self-center" />;
    if (TEST_STATUS.PASS === status)
      return <MdCheckCircle className="text-success-500 h-6 w-6 self-center" />;
    if (TEST_STATUS.UNKNOWN === status)
      return <MdHelp className="text-attention-500 h-6 w-6 self-center" />;
    if (TEST_STATUS.SKIPPED === status)
      return <MdRemoveCircle className="text-base-500 h-6 w-6 self-center" />;
    return <MdHelp className="text-attention-500 h-6 w-6 self-center" />;
  };

  return (
    <div
      className="border-base-200 hover:bg-base-100 pointer-events-auto mt-1 flex cursor-pointer border-b hover:rounded"
      onClick={handleClick}
      role="presentation"
    >
      <div className="mt-1 pl-3 pt-3">{renderStatusIcon()}</div>

      <div className="flex flex-1 flex-col overflow-hidden p-4 pr-0">
        <div className="flex items-start justify-between">
          <p className="mr-3 text-base font-medium">{data?.name}</p>
          <PropagationBlocker className="mt-1 shrink-0 pr-3 text-xs">
            <StatusBadges
              statusStats={data.statusStats}
              onClickHandler={(clickData) =>
                handleTagClick('status', clickData.itemClicked)
              }
            />
          </PropagationBlocker>
        </div>
        <div className="text-base-500 mt-3 flex text-sm font-normal">
          <p>
            Ran by {data?.user} on{' '}
            {getCustomTimeStamp({ dateString: data?.startedAt })}
          </p>
        </div>
        {!isEmpty(data?.historyAggregate) && (
          <PropagationBlocker className="mt-2">
            {!!data?.historyAggregate?.isFlaky && (
              <O11yBadge
                modifier="warn"
                onClick={() => handleTagClick('flaky', true)}
                text={`Flaky (${data?.historyAggregate?.isFlaky})`}
                wrapperClassName="mr-2"
              />
            )}
            {!!data?.historyAggregate?.isAlwaysFailing && (
              <O11yBadge
                modifier="error"
                onClick={() => handleTagClick('history', 'isAlwaysFailing')}
                text={`Always Failing (${data?.historyAggregate?.isAlwaysFailing})`}
                wrapperClassName="mr-2"
              />
            )}
            {!!data?.historyAggregate?.isNewFailure && (
              <O11yBadge
                modifier="error"
                onClick={() => handleTagClick('history', 'isNewFailure')}
                text={`New Failures (${data?.historyAggregate?.isNewFailure})`}
                wrapperClassName="mr-2"
              />
            )}
            {!!data?.historyAggregate?.isPerformanceAnomaly && (
              <O11yBadge
                modifier="error"
                onClick={() =>
                  handleTagClick('history', 'isPerformanceAnomaly')
                }
                text={`Performance Anomaly (${data?.historyAggregate?.isPerformanceAnomaly})`}
                wrapperClassName="mr-2"
              />
            )}
          </PropagationBlocker>
        )}
      </div>
    </div>
  );
}

UniqueBuildItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
