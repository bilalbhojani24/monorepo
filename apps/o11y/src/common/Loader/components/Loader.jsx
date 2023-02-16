import React from 'react';
import LoaderIcon from 'assets/icons/loader.svg';
import className from 'classnames';
import PropTypes from 'prop-types';

const Loader = ({ isLoading, isOverlayed, wrapperClassName }) => {
  if (!isLoading) return '';

  return (
    <div
      className={className(
        'flex justify-center items-center  w-full min-h-min',
        wrapperClassName,
        {
          'absolute left-0 top-0': isOverlayed
        }
      )}
    >
      <img src={LoaderIcon} alt="" className="text-base-400 animate-spin" />
    </div>
  );
};

Loader.propTypes = {
  wrapperClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  isOverlayed: PropTypes.bool
};

Loader.defaultProps = {
  wrapperClassName: '',
  isLoading: true,
  isOverlayed: false
};

export default Loader;
