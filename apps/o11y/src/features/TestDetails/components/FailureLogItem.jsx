import React, { useEffect, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import Copy2Clipboard from 'common/Copy2Clipboard';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import { LOG_LEVELS } from '../constants';
import { useLogsContext } from '../contexts/LogsContext';
import { getParsedJSON } from '../utils';

import LogItemDuration from './LogItemDuration';
import LogItemIcon from './LogItemIcon';
import LogItemStartTime from './LogItemStartTime';
import LogTypeIcon from './LogTypeIcon';

export default function FailureLogItem({ data, searchText }) {
  const [logData, setLogData] = useState({});
  const [isMatching, setIsMatching] = useState(true);
  const { handleLogDurationClick } = useLogsContext();
  // const { handleLogTDInteractionEvent } = useContext(TestDetailsContentContext);

  useEffect(() => {
    if (!isEmpty(data)) {
      setLogData(getParsedJSON(data?.content) || []);
    }
  }, [data]);

  useEffect(() => {
    if (!isEmpty(data?.content)) {
      if (searchText) {
        try {
          const match = data?.content
            ?.replace(/["',[\]]/g, '')
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
        `border-base-300 flex break-words border-b py-4 text-left`,
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
      <pre className="text-xs leading-5">
        {logData.map((item) => (
          <div key={uuidv4()}>{item}</div>
        ))}
      </pre>
      <Copy2Clipboard
        text={logData.join('\n')}
        onCopyCb={() => {
          // handleLogTDInteractionEvent({ interaction: 'exception_copied' })
        }}
      />
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
      <LogTypeIcon logType={data.logType} />
    </button>
  );
}
FailureLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  searchText: PropTypes.string.isRequired
};
