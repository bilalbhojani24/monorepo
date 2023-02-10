import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { TP_TOOLTIP_THEME } from '../../shared/tooltipPopoverConstants';
import { ThemeContextData } from '../../shared/tooltipPopoverThemeContext';

import './styles.scss';

const TooltipHeader = ({ children, wrapperClass }) => {
  const tooltipTheme = useContext(ThemeContextData);

  return (
    <p
      className={twClassNames(
        'font-semibold px-4 mb-2',
        {
          'text-base-900': tooltipTheme?.theme === TP_TOOLTIP_THEME[0],
          'text-base-50': tooltipTheme?.theme === TP_TOOLTIP_THEME[1]
        },
        wrapperClass
      )}
    >
      {children}
    </p>
  );
};

TooltipHeader.propTypes = {
  children: PropTypes.node,
  wrapperClass: PropTypes.string
};
TooltipHeader.defaultProps = {
  children: null,
  wrapperClass: ''
};

export default TooltipHeader;
