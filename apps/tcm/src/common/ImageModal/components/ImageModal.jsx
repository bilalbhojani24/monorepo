/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import {
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import Loader from 'common/Loader';
import PropTypes from 'prop-types';

import useImageModal from './useImageModal';

const ImageModal = ({ imageLink, show, onClose, altText }) => {
  const { isLoading } = useImageModal({ imageLink });

  return (
    <TMModal show={show} withDismissButton onOverlayClick={onClose} size="4xl">
      <TMModalHeader heading="Image Preview" handleDismissClick={onClose} />
      <TMModalBody className=" flex min-h-[65vh] items-center justify-center">
        {isLoading ? (
          <div className="flex h-72 items-center justify-center">
            <Loader />
          </div>
        ) : (
          <img
            src={imageLink}
            alt={altText}
            className="h-full max-h-full max-w-full object-contain"
          />
        )}
      </TMModalBody>
      <TMModalFooter position="right" />
    </TMModal>
  );
};

ImageModal.propTypes = {
  altText: PropTypes.string,
  imageLink: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func
};

ImageModal.defaultProps = {
  altText: '',
  imageLink: '',
  show: true,
  onClose: () => {}
};

export default ImageModal;
