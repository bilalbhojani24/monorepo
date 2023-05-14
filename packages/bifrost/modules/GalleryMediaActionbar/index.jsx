import React from 'react';
import PropTypes from 'prop-types';

const GalleryMediaActionbar = ({ primaryActions, secondaryActions }) => (
  <div>
    {primaryActions}
    {secondaryActions}
  </div>
);

GalleryMediaActionbar.propTypes = {
  primaryActions: PropTypes.node,
  secondaryActions: PropTypes.node
};
GalleryMediaActionbar.defaultProps = {
  primaryActions: null,
  secondaryActions: null
};

export default GalleryMediaActionbar;
