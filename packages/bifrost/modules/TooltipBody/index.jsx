import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TP_TOOLTIP_THEME } from '../../shared/tooltipPopoverConstants';
import { ThemeContextData } from '../../shared/tooltipPopoverThemeContext';
import { twClassNames } from '../../utils/tailwindUtils';

import './styles.scss';

const TooltipBody = ({ children, wrapperClass }) => {
  const tooltipTheme = useContext(ThemeContextData);

  return (
    <p
      className={twClassNames(
        'px-4 mb-2',
        {
          'text-base-500': tooltipTheme?.theme === TP_TOOLTIP_THEME[0],
          'text-base-300': tooltipTheme?.theme === TP_TOOLTIP_THEME[1]
        },
        wrapperClass
      )}
    >
      {children}
    </p>
  );
};

TooltipBody.propTypes = {
  children: PropTypes.node,
  wrapperClass: PropTypes.string
};
TooltipBody.defaultProps = {
  children: null,
  wrapperClass: ''
};

export default TooltipBody;
