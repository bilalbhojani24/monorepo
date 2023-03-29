import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { useLogsContext } from '../contexts/LogsContext';
import { getActiveLogLevelsByType } from '../slices/selectors';
import { getParsedJSON } from '../utils';

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
      className={`tdl-log-item d-flex align-items-start tdl-log-item--${data?.logType} tdl-log-item--${data?.logLevel}`}
      data-idx={data.idx}
      type="button"
      onClick={handleClick}
    >
      {data?.startOffset && <LogItemStartTime duration={data?.startOffset} />}
      <LogItemIcon logLevel={data?.logLevel} />
      {logData?.request?.method}
      <a
        href={logData?.request?.url}
        target="_blank"
        rel="noopener noreferrer"
        className="tdl-log-item__link"
      >
        {logData?.request?.url?.substring(0, 40)}
        {logData?.request?.url.length > 50 && (
          <>
            ...
            {logData?.request?.url?.substring(
              logData?.request?.url.length - 10,
              logData?.request?.url.length
            )}
          </>
        )}
      </a>
      [{logData?.response?.status}]
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
      <LogTypeIcon logType={data.logType} />
    </button>
  );
}
NetworkLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired
};
