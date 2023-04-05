import React, { useMemo } from 'react';
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
      {lastImg && <ImageItem url={lastImg} />}
      {getFormattedImgs.length > 1 && (
        <span className="bg-brand-300 text-base-900 absolute top-0 right-0 flex h-6 w-6 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full leading-5">
          {getFormattedImgs.length - 1}
        </span>
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ImageGallery;
