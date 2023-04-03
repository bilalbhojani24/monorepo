import React from 'react';
import { MdOutlineTimer } from '@browserstack/bifrost';
import PropTypes from 'prop-types';
import { milliSecondsToTime } from 'utils/dateTime';

export default function LogItemDuration({ duration }) {
  return (
    <div className="ml-2 inline-flex shrink-0 grow items-center justify-end">
      <MdOutlineTimer className="text-base-400 h-5 w-5" />
      <span className="text-base-500 ml-1 text-sm">
        {milliSecondsToTime(duration)}
      </span>
    </div>
  );
}
LogItemDuration.propTypes = {
  duration: PropTypes.number.isRequired
};
