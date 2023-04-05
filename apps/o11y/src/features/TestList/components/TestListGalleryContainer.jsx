/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdOutlineImage } from '@browserstack/bifrost';
import PropTypes from 'prop-types';
import { getParsedImageData } from 'utils/common';

function TestListGalleryContainer({ imgUrl }) {
  const imageLogUrl = imgUrl?.length ? imgUrl[0] : '';
  const mounted = useRef(false);
  const [images, setImages] = useState([]);
  const [loadError, setLoadError] = useState(false);

  const fetchImages = useCallback(() => {
    if (mounted.current) {
      (async () => {
        // const img = await getParsedImageData(imageLogUrl, () =>
        //   setLoadError(true)
        // );
        // if (mounted.current) {
        //   setImages(img);
        // }
        setImages([]);
        setLoadError(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageLogUrl]);

  useEffect(() => {
    mounted.current = true;
    if (imageLogUrl) fetchImages();
    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchImages]);

  if (!images.length && !loadError && imageLogUrl) {
    return (
      <div className="flex items-center gap-x-1">
        <MdOutlineImage className="text-base-500" />
        <span className="text-base-500 text-sm">Screenshot</span>
      </div>
    );
  }
  if ((!images.length && loadError) || !imageLogUrl) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-1">
      <MdOutlineImage className="text-base-500" />
      <span className="text-base-500 text-sm">{images.length} Screenshot</span>
    </div>
  );
}

TestListGalleryContainer.propTypes = {
  imgUrl: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TestListGalleryContainer;
