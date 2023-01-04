import { cloneElement } from 'react';

export const renderIcon = (icon, iconProps = {}) =>
  icon
    ? cloneElement(icon, {
        ...iconProps,
        fontSize: 'inherit'
      })
    : null;
