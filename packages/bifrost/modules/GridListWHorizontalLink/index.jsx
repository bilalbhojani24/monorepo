import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const GridListWHorizontalLink = ({
  image,
  title,
  subTitle,
  onClick,
  wrapperClassName
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div
      className={twClassNames(
        'relative flex items-center space-x-3 rounded-lg border border-base-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2 hover:border-base-400',
        wrapperClassName
      )}
    >
      {image}
      <div className="min-w-0 flex-1">
        <span
          className="absolute inset-0 cursor-pointer"
          aria-hidden="true"
          onClick={(e) => handleClick(e)}
        />
        {title ? (
          <p className="text-base-900 text-left text-sm font-medium">{title}</p>
        ) : null}
        {subTitle ? (
          <p className="text-base-500 truncate text-left text-sm">{subTitle}</p>
        ) : null}
      </div>
    </div>
  );
};

GridListWHorizontalLink.propTypes = {
  image: PropTypes.node,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onClick: PropTypes.func,
  wrapperClassName: PropTypes.string
};
GridListWHorizontalLink.defaultProps = {
  image: null,
  title: '',
  subTitle: '',
  onClick: () => {},
  wrapperClassName: ''
};

export default GridListWHorizontalLink;
