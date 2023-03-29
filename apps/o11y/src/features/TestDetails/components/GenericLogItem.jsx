import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { useLogsContext } from '../contexts/LogsContext';

import LogItemDuration from './LogItemDuration';
import LogItemIcon from './LogItemIcon';
import LogItemStartTime from './LogItemStartTime';
import LogTypeIcon from './LogTypeIcon';

export default function GenericLogItem({ data, searchText }) {
  const [isMatching, setIsMatching] = useState(true);
  const { handleLogDurationClick } = useLogsContext();
  useEffect(() => {
    if (!isEmpty(data?.content)) {
      if (searchText) {
        try {
          const match = data.content
            .toString()
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
      {data.content.toString()}
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
      <LogTypeIcon logType={data.logType} />
    </button>
  );
}
GenericLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired
};
