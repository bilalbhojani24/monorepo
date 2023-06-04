import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { FiChevronLeft, FiChevronRight } from '../Icon';

import Modal from './components/Modal';

const GalleryPreview = ({
  visible,
  topAction,
  bottomAction,
  wrapperClassName,
  bottomWrapperClassName,
  arrowsWrapperClassName,
  backdropWrapperClassName,
  content,
  onNextClick,
  onPrevClick,
  onClose
}) => {
  const handleNextClick = () => {
    onNextClick();
  };
  const handlePrevClick = () => {
    onPrevClick();
  };

  return (
    <div className={wrapperClassName}>
      <Modal
        backdropWrapperClassName={backdropWrapperClassName}
        onOverlayClick={() => onClose()}
        onClose={() => onClose()}
        wrapperClassName="static bg-transparent shadow-none"
        show={visible}
      >
        {topAction}
        {content ? (
          <div className="overflow-auto bg-white">{content}</div>
        ) : (
          <p className="text-center">No content to preview</p>
        )}
        <div
          className={twClassNames(
            'mx-auto absolute flex w-full left-0 justify-between top-1/2',
            arrowsWrapperClassName
          )}
        >
          <Button
            onClick={handlePrevClick}
            variant="minimal"
            wrapperClassName="ml-3 focus:border-none bg-white"
            colors="white"
            icon={<FiChevronLeft className="mx-auto h-5 w-5" />}
            isIconOnlyButton
            aria-label="prev-slider-item-btn"
          />
          <Button
            onClick={handleNextClick}
            variant="minimal"
            wrapperClassName="mr-3 focus:border-none bg-white"
            colors="white"
            icon={<FiChevronRight className="mx-auto h-5 w-5" />}
            isIconOnlyButton
            aria-label="next-slider-item-btn"
          />
        </div>
        <div
          className={twClassNames(
            'flex absolute bottom-3 w-full left-0 justify-center',
            bottomWrapperClassName
          )}
        >
          {bottomAction}
        </div>
      </Modal>
    </div>
  );
};

GalleryPreview.propTypes = {
  content: PropTypes.node.isRequired,
  topAction: PropTypes.node,
  bottomAction: PropTypes.node,
  wrapperClassName: PropTypes.string,
  arrowsWrapperClassName: PropTypes.string,
  bottomWrapperClassName: PropTypes.string,
  backdropWrapperClassName: PropTypes.string,
  visible: PropTypes.bool,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onClose: PropTypes.func
};
GalleryPreview.defaultProps = {
  visible: false,
  topAction: null,
  bottomAction: null,
  wrapperClassName: '',
  arrowsWrapperClassName: '',
  bottomWrapperClassName: '',
  backdropWrapperClassName: '',
  onNextClick: () => {},
  onPrevClick: () => {},
  onClose: () => {}
};

export default GalleryPreview;
