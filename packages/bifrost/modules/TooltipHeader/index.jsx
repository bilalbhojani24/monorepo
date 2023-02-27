import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { TP_TOOLTIP_THEME } from '../../shared/tooltipPopoverConstants';
import { ThemeContextData } from '../../shared/tooltipPopoverThemeContext';

import './styles.scss';

const TooltipHeader = ({ children, wrapperClassName }) => {
  const tooltipTheme = useContext(ThemeContextData);

  return (
    <p
      className={twClassNames(
        'font-semibold px-4 mb-2',
        {
          'text-base-900': tooltipTheme?.theme === TP_TOOLTIP_THEME[0],
          'text-base-50': tooltipTheme?.theme === TP_TOOLTIP_THEME[1]
        },
        wrapperClassName
      )}
    >
      {children}
    </p>
  );
};

TooltipHeader.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};
TooltipHeader.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default TooltipHeader;
