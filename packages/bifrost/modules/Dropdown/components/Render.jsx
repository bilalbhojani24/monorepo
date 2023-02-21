import React, { useEffect } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import PropTypes from 'prop-types';

const Render = ({ children, open, onOpenChange }) => {
  const openChangeFunc = useLatestRef(onOpenChange);

  useEffect(() => {
    openChangeFunc.current?.(open);
  }, [open, openChangeFunc]);

  return <>{children}</>;
};

Render.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired
};

export default Render;
