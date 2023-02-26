import React, { useContext, useEffect } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { DropdownContextData } from '../../../shared/dropdownContext';

const Render = ({ children, open, onOpenChange }) => {
  const { setOpen } = useContext(DropdownContextData);
  const openChangeFunc = useLatestRef(onOpenChange);
  const setOpenRef = useLatestRef(setOpen);

  useEffect(() => {
    openChangeFunc.current?.(open);
    setOpenRef.current?.(open);
  }, [open, openChangeFunc, setOpenRef]);

  return <>{children}</>;
};

Render.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired
};

export default Render;
