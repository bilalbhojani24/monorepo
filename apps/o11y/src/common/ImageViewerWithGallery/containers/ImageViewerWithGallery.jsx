// ImageViewerWithGallery
import React, { useMemo, useRef } from 'react';
import Gallery from 'common/Gallery';
import PropTypes from 'prop-types';

import ImageItem from '../components/ImageItem';

import '../../../ThirdPartyStyles.scss';

export default function ImageViewerWithGallery({ images }) {
  const galleryRef = useRef(null);

  const handleImgClick = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    galleryRef?.current?.fullScreen?.();
    // Make gallery visible after fullscreen
    setTimeout(() => {
      galleryRef?.current?.imageGallery?.current?.classList?.remove?.(
        'invisible'
      );
    }, 0);
  };

  const getFormattedImgs = useMemo(
    () => images.map((i) => ({ s3_url: i })),
    [images]
  );

  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={`imgvw-container imgvw-container--stack-${
        images.length > 3 ? 3 : images.length
      }`}
    >
      <Gallery images={getFormattedImgs} ref={galleryRef} />
      {getFormattedImgs.slice(0, 3).map((item, idx) => (
        <ImageItem
          img={item}
          idx={idx}
          onClick={handleImgClick}
          key={`image-${item?.timestamp}`}
        />
      ))}
    </div>
  );
}

ImageViewerWithGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};
