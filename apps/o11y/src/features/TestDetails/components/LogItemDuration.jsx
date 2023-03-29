import React from 'react';
import { MdOutlineTimer } from '@browserstack/bifrost';
import PropTypes from 'prop-types';
import { milliSecondsToTime } from 'utils/dateTime';

export default function LogItemDuration({ duration }) {
  return (
    <span className="tdl-log-item__timer">
      <MdOutlineTimer className="text-base-400 h-5 w-5" />
      <span className="ml-1">{milliSecondsToTime(duration)}</span>
    </span>
  );
}
LogItemDuration.propTypes = {
  duration: PropTypes.number.isRequired
};
