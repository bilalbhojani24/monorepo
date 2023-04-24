import React, { useEffect, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import StatusIcon from 'common/StatusIcon';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import { useLogsContext } from '../contexts/LogsContext';
import { getParsedJSON, isError, isWarning } from '../utils';

import LogItemDuration from './LogItemDuration';

export default function StepLogItem({ data, isFromList, searchText }) {
  const [logData, setLogData] = useState({});
  const [isMatching, setIsMatching] = useState(true);
  const { handleLogDurationClick } = useLogsContext();

  useEffect(() => {
    if (!isEmpty(data)) {
      setLogData(getParsedJSON(data?.content) || {});
    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(logData)) {
      if (searchText) {
        try {
          const match = logData?.value?.toLowerCase()?.includes(searchText);
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

  if (isEmpty(data) || isEmpty(logData)) {
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
        'border-base-200 flex px-2 items-center gap-1 break-words border-b py-3 text-left',
        {
          'bg-danger-50': isError(data?.logLevel),
          'bg-attention-50': isWarning(data?.logLevel)
        }
      )}
      data-idx={isFromList ? undefined : data.idx}
      data-stepidx={isFromList ? undefined : data.stepIdx}
      type="button"
      onClick={handleClick}
    >
      <span>
        <StatusIcon status={logData?.status} />
      </span>
      <span className="text-base-900 text-sm font-medium leading-5">
        {logData?.value}
      </span>
      {!!data?.duration && (
        <LogItemDuration duration={data.duration} wrapperClassName="mr-0" />
      )}
    </button>
  );
}
StepLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isFromList: PropTypes.bool,
  searchText: PropTypes.string.isRequired
};
StepLogItem.defaultProps = {
  isFromList: false
};
