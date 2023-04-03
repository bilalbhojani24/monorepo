import React from 'react';
import { useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';
import { millisToMinutesAndSeconds } from 'utils/dateTime';

import { useLogsContext } from '../contexts/LogsContext';
import { getTestDetails } from '../slices/selectors';

export default function LogItemStartTime({ duration }) {
  const details = useSelector(getTestDetails);
  const { sessionTestToggle } = useLogsContext();

  return (
    <>
      <span
        className={twClassNames(
          'mr-2 inline-flex shrink-0 justify-end leading-5 text-sm font-medium text-base-700',
          { hidden: !sessionTestToggle }
        )}
      >
        {millisToMinutesAndSeconds(duration)}
      </span>
      {!!details.data.videoLogs?.startOffset && (
        <span
          className={twClassNames(
            'mr-2 hidden shrink-0 justify-end leading-5 text-sm font-medium text-base-700',
            {
              'inline-flex': !sessionTestToggle
            }
          )}
        >
          {millisToMinutesAndSeconds(
            duration - details.data.videoLogs?.startOffset
          )}
        </span>
      )}
    </>
  );
}

LogItemStartTime.propTypes = {
  duration: PropTypes.number.isRequired
};
