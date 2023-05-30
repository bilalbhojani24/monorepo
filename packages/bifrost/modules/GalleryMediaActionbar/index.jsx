import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const GalleryMediaActionbar = ({
  primaryActions,
  secondaryActions,
  wrapperClassName,
  visible
}) =>
  visible ? (
    <div
      className={twClassNames(
        'flex align-center justify-between w-100 border-b border-base-300 mb-5 py-4 flex',
        wrapperClassName
      )}
    >
      {primaryActions}
      {secondaryActions}
    </div>
  ) : null;

GalleryMediaActionbar.propTypes = {
  primaryActions: PropTypes.node,
  secondaryActions: PropTypes.node,
  wrapperClassName: PropTypes.string,
  visible: PropTypes.bool
};
GalleryMediaActionbar.defaultProps = {
  primaryActions: null,
  secondaryActions: null,
  wrapperClassName: '',
  visible: false
};

export default GalleryMediaActionbar;
