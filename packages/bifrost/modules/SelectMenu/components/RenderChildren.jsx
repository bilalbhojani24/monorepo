import React, { useContext, useEffect } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { SelectMenuContextData } from '../../../shared/selectMenuContext';

const Render = ({ children, open, onOpenChange }) => {
  const { setOpen } = useContext(SelectMenuContextData);
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