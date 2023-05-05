import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const RenderAccessibleChild = ({ children, isPopoverOpen }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && isPopoverOpen) {
      const firstFocusableElement = containerRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }, [isPopoverOpen]);

  return <div ref={containerRef}>{children}</div>;
};

RenderAccessibleChild.propTypes = {
  children: PropTypes.node.isRequired,
  isPopoverOpen: PropTypes.bool.isRequired
};

export default RenderAccessibleChild;
