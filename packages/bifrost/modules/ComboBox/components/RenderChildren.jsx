import React, { useContext, useEffect } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { ComboboxContextData } from '../../../shared/comboboxContext';

const Render = ({ children, currentValues, open, onOpenChange }) => {
  const { setOpen, setCurrentSelectedValues, isBadge, setQuery } =
    useContext(ComboboxContextData);
  const openChangeFunc = useLatestRef(onOpenChange);
  const setOpenRef = useLatestRef(setOpen);

  useEffect(() => {
    openChangeFunc.current?.(open);
    setOpenRef.current?.(open);
    if (!open) setQuery('');
  }, [open, openChangeFunc, setQuery, setOpenRef]);

  useEffect(() => {
    if (isBadge) setCurrentSelectedValues(currentValues);
  }, [isBadge, currentValues, setCurrentSelectedValues]);

  return <>{children}</>;
};

Render.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired
};

export default Render;
