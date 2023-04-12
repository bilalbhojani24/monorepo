import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { DefaultBrowserIcon } from 'assets/icons/components';
import { O11yHyperlink, O11yTruncateText } from 'common/bifrostProxy';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import { useLogsContext } from '../contexts/LogsContext';
import { getActiveLogLevelsByType } from '../slices/selectors';
import { getParsedJSON, isError, isWarning } from '../utils';

import LogItemDuration from './LogItemDuration';
import LogItemIcon from './LogItemIcon';
import LogItemStartTime from './LogItemStartTime';
import LogTypeIcon from './LogTypeIcon';

export default function NetworkLogItem({ data, searchText }) {
  const [logData, setLogData] = useState({});
  const [isMatching, setIsMatching] = useState(true);
  const { handleLogDurationClick } = useLogsContext();
  const activeLogLevels = useSelector((state) =>
    getActiveLogLevelsByType(state, data.logType)
  );

  useEffect(() => {
    if (!isEmpty(data)) {
      setLogData(getParsedJSON(data?.content) || {});
    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(logData)) {
      if (searchText) {
        try {
          const match =
            logData?.request?.method?.toLowerCase()?.includes(searchText) ||
            logData?.request?.url?.toLowerCase()?.includes(searchText) ||
            logData?.response?.status?.toLowerCase()?.includes(searchText);
          setIsMatching(match);
        } catch {
          setIsMatching(false);
        }
      } else {
        setIsMatching(true);
      }
    }
  }, [searchText, logData]);

  if (!isMatching) {
    return null;
  }

  if (
    isEmpty(data) ||
    isEmpty(logData) ||
    !activeLogLevels.includes(data?.logLevel)
  ) {
    return null;
  }

  const handleClick = () => {
    if (data?.startOffset) {
      handleLogDurationClick(data?.startOffset / 1000);
    }
  };

  return (
    <button
      className={twClassNames(
        'border-base-200 flex px-2 pl-8 break-words border-b py-3 text-left',
        {
          'bg-danger-50': isError(data?.logLevel),
          'bg-attention-50': isWarning(data?.logLevel)
        }
      )}
      data-idx={data.idx}
      type="button"
      onClick={handleClick}
    >
      {data?.startOffset && <LogItemStartTime duration={data?.startOffset} />}
      <div className="flex flex-col gap-2">
        <p
          className={twClassNames(
            'inline-flex text-sm font-medium leading-5 text-base-900',
            {
              'text-danger-600': isError(data?.logLevel),
              'text-attention-600': isWarning(data?.logLevel)
            }
          )}
        >
          {logData?.request?.method}
        </p>

        {(logData?.request?.url || logData?.request?.status) && (
          <div className="flex items-center gap-2">
            <span className="inline-flex max-w-xs items-center gap-1">
              <span>
                <DefaultBrowserIcon className="fill-base-500 h-4 w-4" />
              </span>
              <O11yHyperlink
                href={logData?.request?.url}
                target="_blank"
                wrapperClassName=""
              >
                <O11yTruncateText
                  wrapperClassName="line-clamp-1"
                  tooltipContent={
                    <p className="text-base-500 break-words px-4 text-sm font-normal leading-5 text-white">
                      {logData?.request?.url}
                    </p>
                  }
                  hidetooltipTriggerIcon
                >
                  <span className="text-base-500 text-sm font-normal leading-5">
                    {logData?.request?.url.substring(0, 80)}
                  </span>
                </O11yTruncateText>
              </O11yHyperlink>
            </span>

            {logData?.response?.status && logData?.request?.url && (
              <p className="bg-base-400 flex h-1 w-1 items-center justify-center rounded-full" />
            )}
            <span className="text-base-500 inline-flex items-center text-sm font-normal leading-5">
              <LogItemIcon
                logLevel={data?.logLevel}
                wrapperClassName="text-base-500 mr-1"
              />
              {logData?.response?.status}
            </span>
          </div>
        )}
      </div>
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
      <LogTypeIcon logType={data.logType} />
    </button>
  );
}
NetworkLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired
};
