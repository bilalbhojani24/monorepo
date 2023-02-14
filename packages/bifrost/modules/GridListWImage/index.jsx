import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const GridListWImage = ({
  image,
  label,
  subText,
  wrapperClassName,
  imageClassName
}) => (
  <div className={wrapperClassName}>
    <div className="aspect-w-10 aspect-h-7 bg-base-100 focus-within:ring-offset-base-100 focus-within:ring-brand-500 group mb-2 block w-full overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-offset-2">
      <img
        src={image}
        alt=""
        className={twClassNames(
          'pointer-events-none object-cover group-hover:opacity-75',
          imageClassName
        )}
      />
      <button type="button" className="absolute inset-0 focus:outline-none">
        <span className="sr-only">{label}</span>
      </button>
    </div>
    {label?.length > 0 && (
      <p className="text-base-900 pointer-events-none block truncate text-sm font-medium">
        {label}
      </p>
    )}
    <p className="text-base-500 pointer-events-none block text-sm font-medium">
      {subText}
    </p>
  </div>
);

GridListWImage.propTypes = {
  image: PropTypes.string,
  label: PropTypes.string,
  subText: PropTypes.string,
  wrapperClassName: PropTypes.string,
  imageClassName: PropTypes.string
};
GridListWImage.defaultProps = {
  image: '',
  label: '',
  subText: '',
  wrapperClassName: '',
  imageClassName: ''
};

export default GridListWImage;
