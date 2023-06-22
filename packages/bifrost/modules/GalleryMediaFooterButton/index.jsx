import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

const GalleryMediaFooterButton = (props) => {
  const { children, onClick } = props;
  const handleClick = (e) => {
    onClick(e);
  };
  return (
    <Button {...props} colors="white" onClick={(e) => handleClick(e)}>
      {children}
    </Button>
  );
};
GalleryMediaFooterButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};
GalleryMediaFooterButton.defaultProps = {};

export default GalleryMediaFooterButton;
