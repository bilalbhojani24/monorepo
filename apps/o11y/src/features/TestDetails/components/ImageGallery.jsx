import React, { useMemo } from 'react';
import { O11yBadge } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import ImageItem from './ImageItem';

const ImageGallery = ({ images }) => {
  const getFormattedImgs = useMemo(
    () => images.map((i) => ({ s3_url: i })),
    [images]
  );

  const lastImg = getFormattedImgs.at(-1);

  return (
    <div className="relative mt-4 inline-block">
      {lastImg && <ImageItem url={lastImg.s3_url} />}
      {getFormattedImgs.length > 1 && (
        <O11yBadge
          text={getFormattedImgs.length - 1}
          modifier="base"
          wrapperClassName="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 leading-5 shadow ring-1 ring-base-200"
        />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ImageGallery;
