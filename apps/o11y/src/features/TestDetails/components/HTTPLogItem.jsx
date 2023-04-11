import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { useLogsContext } from '../contexts/LogsContext';
import { getActiveLogLevelsByType } from '../slices/selectors';
import { getParsedJSON, isError, isWarning } from '../utils';

import LogItemDuration from './LogItemDuration';
import LogItemIcon from './LogItemIcon';
import LogItemStartTime from './LogItemStartTime';
import LogTypeIcon from './LogTypeIcon';

export default function HTTPLogItem({ data, searchText }) {
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
            logData?.http_response?.path?.toLowerCase()?.includes(searchText) ||
            logData?.http_response?.method
              ?.toLowerCase()
              ?.includes(searchText) ||
            logData?.http_response?.status_code
              ?.toLowerCase()
              ?.includes(searchText);
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
        'border-base-200 flex px-2 pl-8 items-start break-words border-b py-3 text-left',
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
      <LogItemIcon logLevel={data?.logLevel} />
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
          {logData?.http_response?.method}
        </p>
        {(logData?.http_response?.path ||
          logData?.http_response?.status_code) && (
          <div className="flex items-center gap-2">
            {logData?.http_response?.path}
            {logData?.http_response?.path &&
              logData?.http_response?.status_code && (
                <p className="flex h-1 w-1 items-center justify-center rounded-full" />
              )}
            [{logData?.http_response?.status_code}]
          </div>
        )}
      </div>
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
      <LogTypeIcon logType={data.logType} />
    </button>
  );
}
HTTPLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired
};
