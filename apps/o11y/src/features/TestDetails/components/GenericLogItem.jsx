import React, { useEffect, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { useLogsContext } from '../contexts/LogsContext';
import { isError, isWarning } from '../utils';

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
      className={twClassNames(
        'border-base-200 px-2 pl-8 flex items-center break-words border-b py-4 text-left',
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
      <span className="text-sm font-normal leading-5">
        {data.content.toString()}
      </span>
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
      <LogTypeIcon logType={data.logType} />
    </button>
  );
}
GenericLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired
};
