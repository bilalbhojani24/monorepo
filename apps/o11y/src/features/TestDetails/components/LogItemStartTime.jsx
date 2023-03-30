import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { millisToMinutesAndSeconds } from 'utils/dateTime';

import { getTestDetails } from '../slices/selectors';

export default function LogItemStartTime({ duration }) {
  const details = useSelector(getTestDetails);

  return (
    <>
      <span className="ml-2 inline-flex shrink-0 justify-end leading-5">
        {millisToMinutesAndSeconds(duration)}
      </span>
      {!!details.data.videoLogs?.startOffset && (
        <span className="ml-2 inline-flex shrink-0 justify-end leading-5">
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
