import React from 'react';
import PropTypes from 'prop-types';
import TooltipContainer from '../TooltipContainer';
import Layout from './component/Layout';

import './styles.scss';
import { PLACEMENT_ALIGN, PLACEMENT_SIDE } from '../TooltipContainer/const/tooltipContainerConstants';
import { TOOLTIP_THEME } from './const/tooltipConstants';

const Tooltip = (props) => {
  const { actionObject, children, delay, description, theme, title, placementAlign, placementSide } = props;
  return (
    <TooltipContainer
      content={<Layout actionObject={actionObject} description={description} title={title} theme={theme} />}
      placementAlign={placementAlign}
      placementSide={placementSide}
      delay={delay}
      arrowClassName={theme === TOOLTIP_THEME[1] ? 'dark-arrow' : ''}
    >
      {children}
    </TooltipContainer>
  );
};

Tooltip.propTypes = {
  actionObject: {
    primaryButtonLabel: PropTypes.string,
    primaryButtonAction: PropTypes.func,
    secondaryButtonLabel: PropTypes.string,
    secondaryButtonAction: PropTypes.func,
  },
  children: PropTypes.node,
  delay: PropTypes.number,
  description: PropTypes.string,
  theme: PropTypes.oneOf(TOOLTIP_THEME),
  title: PropTypes.string,
  placementAlign: PropTypes.oneOf(PLACEMENT_ALIGN),
  placementSide: PropTypes.oneOf(PLACEMENT_SIDE),
};
Tooltip.defaultProps = {
  actionObject: {
    primaryButtonLabel: '',
    primaryButtonAction: () => {},
    secondaryButtonLabel: '',
    secondaryButtonAction: () => {},
  },
  children: null,
  delay: 200,
  description: '',
  theme: TOOLTIP_THEME[0],
  title: '',
  placementAlign: PLACEMENT_ALIGN[0],
  placementSide: PLACEMENT_SIDE[0],
};

export default Tooltip;
