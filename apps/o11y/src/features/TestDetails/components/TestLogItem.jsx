import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { LOG_LEVELS } from '../constants';
import { useLogsContext } from '../contexts/LogsContext';
import { getActiveLogLevelsByType } from '../slices/selectors';

import LogItemDuration from './LogItemDuration';
import LogItemIcon from './LogItemIcon';
import LogItemStartTime from './LogItemStartTime';
import LogTypeIcon from './LogTypeIcon';

export default function TestLogItem({ data, searchText }) {
  const [isMatching, setIsMatching] = useState(true);
  const { handleLogDurationClick } = useLogsContext();
  const activeLogLevels = useSelector((state) =>
    getActiveLogLevelsByType(state, data.logType)
  );

  useEffect(() => {
    if (!isEmpty(data.content)) {
      if (searchText) {
        try {
          const match = data?.content?.toLowerCase()?.includes(searchText);
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

  if (isEmpty(data) || !activeLogLevels.includes(data?.logLevel)) {
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
        'border-base-200 flex break-words border-b py-4 text-left',
        {
          '': LOG_LEVELS.ERROR === data?.logLevel
          // '': LOG_LEVELS.SEVERE === data?.logLevel
        }
      )}
      data-idx={data.idx}
      type="button"
      onClick={handleClick}
    >
      {data?.startOffset && <LogItemStartTime duration={data?.startOffset} />}
      <LogItemIcon logLevel={data?.logLevel} />
      <span className="text-sm font-medium leading-5">{data?.content}</span>
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
      <LogTypeIcon logType={data.logType} />
    </button>
  );
}
TestLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired
};
