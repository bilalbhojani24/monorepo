/* eslint-disable tailwindcss/no-custom-classname */
import React, { forwardRef } from 'react';
import ImageGallery from 'react-image-gallery';
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlineClose,
  MdOutlineFullscreen
} from '@browserstack/bifrost';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import 'react-image-gallery/styles/scss/image-gallery.scss';
import '../../../ThirdPartyStyles.scss';

const Gallery = forwardRef(({ images }, galleryRef) => {
  const renderFullscreenButton = (onClick, isFullScreen) => (
    <button type="button" onClick={onClick} className="full-screen-btn">
      {isFullScreen ? <MdOutlineClose /> : <MdOutlineFullscreen />}
    </button>
  );

  const renderLeftNav = (onClick, disabled) => (
    <button type="button" onClick={onClick} className="left-nav-btn">
      <MdChevronLeft disabled={disabled} />
    </button>
  );

  const renderRightNav = (onClick, disabled) => (
    <button type="button" onClick={onClick} className="right-nav-btn">
      <MdChevronRight disabled={disabled} />
    </button>
  );

  const handleImageGalleryFullscreenChange = (flag) => {
    setTimeout(() => {
      // Only trigger on full screen exit
      if (flag) return false;
      galleryRef?.current?.imageGallery?.current?.classList?.add?.('invisible');
      return false;
    }, 100);
  };

  return (
    <div className="to-image-gallery">
      <ImageGallery
        onScreenChange={(flag) => handleImageGalleryFullscreenChange(flag)}
        ref={galleryRef}
        items={images?.map((item) => ({
          original: item?.s3_url,
          thumbnail: item?.s3_url
        }))}
        lazyLoad
        additionalClass={classNames('invisible', {
          'single-image-gallery': images.length === 1
        })}
        thumbnailPosition="left"
        showThumbnails={images.length > 1}
        showPlayButton={false}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        renderFullscreenButton={renderFullscreenButton}
      />
    </div>
  );
});

Gallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Gallery;
