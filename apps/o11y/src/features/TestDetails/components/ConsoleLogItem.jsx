import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { useLogsContext } from '../contexts/LogsContext';
import { getActiveLogLevelsByType } from '../slices/selectors';

import LogItemDuration from './LogItemDuration';
import LogItemIcon from './LogItemIcon';
import LogItemStartTime from './LogItemStartTime';
import LogTypeIcon from './LogTypeIcon';

export default function ConsoleLogItem({ data, searchText }) {
  const [logData, setLogData] = useState({});
  const [isMatching, setIsMatching] = useState(true);
  const { handleLogDurationClick } = useLogsContext();
  const activeLogLevels = useSelector((state) =>
    getActiveLogLevelsByType(state, data.logType)
  );

  useEffect(() => {
    if (!isEmpty(data)) {
      if (data?.content?.includes('\n')) {
        setLogData(data?.content?.split('\n') || []);
      } else if (data?.content?.includes('\\n')) {
        setLogData(data?.content?.split('\\n') || []);
      } else {
        setLogData([data?.content]);
      }
    }
  }, [data]);
  useEffect(() => {
    if (!isEmpty(data?.content)) {
      if (searchText) {
        try {
          const match = data.content
            ?.replace(/\n/g, '')
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
  }, [searchText, data.content]);

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
      <pre className="tdl-log-item__console">
        {logData.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </pre>
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
      <LogTypeIcon logType={data.logType} />
    </button>
  );
}
ConsoleLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired
};
