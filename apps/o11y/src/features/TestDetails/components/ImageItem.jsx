/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useState } from 'react';
import { O11yHyperlink } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const ImageItem = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadFailed, setIsLoadFailed] = useState(false);
  const handleImageLoad = () => {
    setIsLoadFailed(false);
    setIsLoading(true);
  };
  const handleImageError = () => {
    setIsLoading(true);
    setIsLoadFailed(true);
  };
  return (
    <O11yHyperlink
      wrapperClassName="max-w-[340px] relative"
      target="_blank"
      href={url}
      onClick={(event) => {
        if (isLoading || isLoadFailed) {
          event.preventDefault();
        }
      }}
    >
      <img
        src={url}
        alt="test screenshot"
        className="max-h-[300px]"
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </O11yHyperlink>
  );
};

ImageItem.propTypes = {
  url: PropTypes.string.isRequired
};

export default ImageItem;
