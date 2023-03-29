import React, { useState } from 'react';
import {
  ScreenshotFailureIcon,
  ScreenshotLoadingIcon
} from 'assets/icons/components';
import PropTypes from 'prop-types';

import '../../../ThirdPartyStyles.scss';

function ImageItem({ img, idx, onClick }) {
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
    <>
      <img
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`${
          isLoading || isLoadFailed ? 'hidden' : 'flex'
        } imgvw-container stack-image stack-image-${idx}`}
        key={`image-${img?.timestamp}-${idx}`}
        role="presentation"
        src={img?.s3_url}
        alt="Snapshot"
        onClick={isLoadFailed || isLoading ? () => {} : onClick}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      {isLoading && <ScreenshotLoadingIcon className="" />}
      {isLoadFailed && <ScreenshotFailureIcon className="" />}
    </>
  );
}

ImageItem.propTypes = {
  img: PropTypes.objectOf(PropTypes.any).isRequired,
  onClick: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired
};

export default React.memo(ImageItem);
