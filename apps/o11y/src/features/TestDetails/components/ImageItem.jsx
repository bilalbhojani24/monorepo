/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import {
  ScreenshotFailureIcon,
  ScreenshotLoadingIcon
} from 'assets/icons/components';
import { O11yHyperlink } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const ImageItem = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadFailed, setIsLoadFailed] = useState(false);
  const handleImageLoad = () => {
    setIsLoadFailed(false);
    setIsLoading(false);
  };
  const handleImageError = () => {
    setIsLoading(false);
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
        className={twClassNames('max-h-80 drop-shadow-md', {
          hidden: isLoading || isLoadFailed
        })}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />

      {isLoading && <ScreenshotLoadingIcon className="max-h-80" />}
      {isLoadFailed && <ScreenshotFailureIcon className="max-h-80" />}
    </O11yHyperlink>
  );
};

ImageItem.propTypes = {
  url: PropTypes.string.isRequired
};

export default ImageItem;
