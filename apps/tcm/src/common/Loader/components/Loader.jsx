import React from 'react';
import { HourglassBottomOutlinedIcon } from 'assets/icons';
import className from 'classnames';
import PropTypes from 'prop-types';

const Loader = ({ isLoading, isOverlayed, wrapperClass }) => {
  if (!isLoading) return '';

  return (
    <div
      className={className(
        'flex justify-center items-center h-full w-full min-h-min',
        wrapperClass,
        {
          'absolute left-0 top-0': isOverlayed
        }
      )}
    >
      <HourglassBottomOutlinedIcon className="text-base-400 animate-spin" />
    </div>
  );
};

Loader.propTypes = {
  wrapperClass: PropTypes.string,
  isLoading: PropTypes.bool,
  isOverlayed: PropTypes.bool
};

Loader.defaultProps = {
  wrapperClass: '',
  isLoading: true,
  isOverlayed: false
};

export default Loader;
