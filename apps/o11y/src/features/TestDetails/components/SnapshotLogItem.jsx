/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { getActiveLogLevelsByType } from '../slices/selectors';
import { getParsedJSON, isError, isWarning } from '../utils';

import ImageItem from './ImageItem';
import LogItemDuration from './LogItemDuration';
import LogItemIcon from './LogItemIcon';
import LogItemStartTime from './LogItemStartTime';
import LogTypeIcon from './LogTypeIcon';

export default function SnapshotLogItem({ data }) {
  const [logData, setLogData] = useState({});

  const activeLogLevels = useSelector((state) =>
    getActiveLogLevelsByType(state, data.logType)
  );

  useEffect(() => {
    if (!isEmpty(data)) {
      const parsedContent = getParsedJSON(data?.content) || [];
      setLogData([parsedContent]);
    }
  }, [data]);

  if (
    isEmpty(data) ||
    isEmpty(logData) ||
    !activeLogLevels.includes(data?.logLevel)
  ) {
    return null;
  }
  return (
    <div
      className={twClassNames(
        'border-base-200 flex px-2 pl-8 break-words border-b py-4 text-left',
        {
          'bg-danger-50': isError(data?.logLevel),
          'bg-attention-50': isWarning(data?.logLevel)
        }
      )}
      data-idx={data.idx}
    >
      {data?.startOffset && <LogItemStartTime duration={data?.startOffset} />}
      <LogItemIcon logLevel={data?.logLevel} />
      <ImageItem url={logData?.[0]?.s3_url} />
      {!!data?.duration && <LogItemDuration duration={data.duration} />}
      <LogTypeIcon logType={data.logType} />
    </div>
  );
}
SnapshotLogItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
