import React, { useContext, useEffect } from 'react';
import { useLatestRef } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import { ComboboxContextData } from '../../../shared/comboboxContext';

const Render = ({ children, open, onOpenChange, selectedValues }) => {
  const { setOpen, setQuery, isBadge, setCurrentSelectedValues } =
    useContext(ComboboxContextData);
  const openChangeFunc = useLatestRef(onOpenChange);
  const setOpenRef = useLatestRef(setOpen);
  const setCurrentSelectedValuesRef = useLatestRef(setCurrentSelectedValues);

  useEffect(() => {
    openChangeFunc.current?.(open);
    setOpenRef.current?.(open);
    if (!open) setQuery('');
  }, [open, openChangeFunc, setQuery, setOpenRef]);

  useEffect(() => {
    if (!isBadge) setCurrentSelectedValuesRef.current?.(selectedValues);
  }, [selectedValues, isBadge, setCurrentSelectedValuesRef]);

  return <>{children}</>;
};

Render.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func,
  selectedValues: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
        image: PropTypes.string
      })
    ),
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string
    })
  ])
};

Render.defaultProps = {
  onOpenChange: null,
  selectedValues: undefined
};

export default Render;
