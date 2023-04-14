import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineImage } from '@browserstack/bifrost';
import PropTypes from 'prop-types';
import { getParsedImageData } from 'utils/common';

function TestListGalleryContainer({ imgUrl }) {
  const imageLogUrl = imgUrl?.length ? imgUrl[0] : '';
  const mounted = useRef(false);
  const [images, setImages] = useState([]);

  const fetchImages = useCallback(() => {
    if (mounted.current) {
      (async () => {
        const img = await getParsedImageData(imageLogUrl, () => {});
        if (mounted.current) {
          setImages(img);
        }
      })();
    }
  }, [imageLogUrl]);

  useEffect(() => {
    mounted.current = true;
    if (imageLogUrl) {
      fetchImages();
    }
    return () => {
      mounted.current = false;
    };
  }, [fetchImages, imageLogUrl]);

  if (!images.length) {
    return null;
  }

  return (
    <div className="mb-2 flex items-center gap-x-1">
      <MdOutlineImage className="text-base-500" />
      <span className="text-base-500 text-sm">{images.length} Screenshot</span>
    </div>
  );
}

TestListGalleryContainer.propTypes = {
  imgUrl: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TestListGalleryContainer;
