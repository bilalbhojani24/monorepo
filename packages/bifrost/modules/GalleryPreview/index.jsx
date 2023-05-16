import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { BsChevronLeft, BsChevronRight } from '../Icon';
import Modal from '../Modal';

const GalleryPreview = ({
  previewVisible,
  topAction,
  bottomAction,
  wrapperClassName,
  bottomWrapperClassName,
  arrowsWrapperClassName,
  content
}) => (
  <div className={wrapperClassName}>
    <Modal
      wrapperClassName="static bg-transparent shadow-none"
      show={previewVisible}
    >
      {topAction}
      {content ? (
        <div>{content}</div>
      ) : (
        <p className="text-center">No content to preview</p>
      )}
      <div
        className={twClassNames(
          'mx-auto absolute flex w-full left-0 justify-between',
          arrowsWrapperClassName
        )}
      >
        <Button
          wrapperClassName="ml-3"
          colors="white"
          icon={<BsChevronLeft className="mx-auto h-4 w-4" />}
          isIconOnlyButton
        />
        <Button
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

GalleryPreview.propTypes = {
  content: PropTypes.node,
  topAction: PropTypes.node,
  bottomAction: PropTypes.node,
  wrapperClassName: PropTypes.string,
  arrowsWrapperClassName: PropTypes.string,
  bottomWrapperClassName: PropTypes.string,
  previewVisible: PropTypes.bool
};
GalleryPreview.defaultProps = {
  previewVisible: true,
  topAction: null,
  bottomAction: null,
  content: null,
  wrapperClassName: '',
  arrowsWrapperClassName: '',
  bottomWrapperClassName: ''
};

export default GalleryPreview;
