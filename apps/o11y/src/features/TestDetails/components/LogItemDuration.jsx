import React from 'react';
import { MdOutlineTimer } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';
import { milliSecondsToTime } from 'utils/dateTime';

export default function LogItemDuration({ duration, wrapperClassName }) {
  return (
    <div
      className={twClassNames(
        'mr-5 inline-flex shrink-0 grow items-center justify-end',
        wrapperClassName
      )}
    >
      <MdOutlineTimer className="text-base-400 h-4 w-4" />
      <span className="text-base-500 ml-1 text-sm">
        {milliSecondsToTime(duration)}
      </span>
    </div>
  );
}
LogItemDuration.propTypes = {
  duration: PropTypes.number.isRequired,
  wrapperClassName: PropTypes.string
};

LogItemDuration.defaultProps = {
  wrapperClassName: ''
};
