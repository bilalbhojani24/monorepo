import React from 'react';
import PropTypes from 'prop-types';

const Gallery = ({ children, wrapperClassName }) => (
  <div className={wrapperClassName}>{children}</div>
);

Gallery.propTypes = {
  children: PropTypes.node.isRequired,
  wrapperClassName: PropTypes.string
};
Gallery.defaultProps = {
  wrapperClassName: ''
};

export default Gallery;
