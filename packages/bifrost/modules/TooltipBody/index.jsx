import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { TP_TOOLTIP_THEME } from '../../shared/tooltipPopoverConstants';
import { ThemeContextData } from '../../shared/tooltipPopoverThemeContext';

import './styles.scss';

const TooltipBody = ({ children, wrapperClassName }) => {
  const tooltipTheme = useContext(ThemeContextData);

  return (
    <p
      className={twClassNames(
        'px-4 mb-2',
        {
          'text-base-500': tooltipTheme?.theme === TP_TOOLTIP_THEME[0],
          'text-base-300': tooltipTheme?.theme === TP_TOOLTIP_THEME[1]
        },
        wrapperClassName
      )}
    >
      {children}
    </p>
  );
};

TooltipBody.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};
TooltipBody.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default TooltipBody;
