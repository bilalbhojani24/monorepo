import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { BsChevronLeft, BsChevronRight } from '../Icon';
import Modal from '../Modal';

const GalleryPreview = ({
  visible,
  topAction,
  bottomAction,
  wrapperClassName,
  bottomWrapperClassName,
  arrowsWrapperClassName,
  content,
  onNextClick,
  onPrevClick
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
        wrapperClassName="static bg-transparent shadow-none"
        show={visible}
      >
        {topAction}
        {content ? (
          <div className="bg-white">{content}</div>
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
            wrapperClassName="ml-3"
            colors="white"
            icon={<BsChevronLeft className="mx-auto h-4 w-4" />}
            isIconOnlyButton
          />
          <Button
            onClick={handleNextClick}
            wrapperClassName="mr-3"
            colors="white"
            icon={<BsChevronRight className="mx-auto h-4 w-4" />}
            isIconOnlyButton
          />
        </div>
        <div
          className={twClassNames(
            'flex absolute bottom-3 w-full left-0 justify-center',
            bottomWrapperClassName
          )}
        >
          <div>{bottomAction}</div>
        </div>
      </Modal>
    </div>
  );
};

GalleryPreview.propTypes = {
  content: PropTypes.node,
  topAction: PropTypes.node,
  bottomAction: PropTypes.node,
  wrapperClassName: PropTypes.string,
  arrowsWrapperClassName: PropTypes.string,
  bottomWrapperClassName: PropTypes.string,
  visible: PropTypes.bool,
  onPrevClick: PropTypes.func,
  onNextClick: PropTypes.func
};
GalleryPreview.defaultProps = {
  visible: true,
  topAction: null,
  bottomAction: null,
  content: null,
  wrapperClassName: '',
  arrowsWrapperClassName: '',
  bottomWrapperClassName: '',
  onNextClick: () => {},
  onPrevClick: () => {}
};

export default GalleryPreview;
