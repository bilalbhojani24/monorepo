import React from 'react';
import PropTypes from 'prop-types';
import TooltipContainer from '../TooltipContainer';
import Layout from '../SharedTooltipPopover/component/Layout';
import { TOOLTIP_THEME, PLACEMENT_ALIGN, PLACEMENT_SIDE, BUTTON_TYPE } from '../SharedTooltipPopover/const';

import './styles.scss';

const Tooltip = (props) => {
  const { actionObject, buttonType, children, delay, description, theme, title, placementAlign, placementSide } = props;
  return (
    <TooltipContainer
      content={
        <Layout
          actionObject={actionObject}
          description={description}
          title={title}
          theme={theme}
          buttonType={buttonType}
        />
      }
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
    primaryButtonUrl: PropTypes.string,
    primaryButtonAction: PropTypes.func,
    secondaryButtonLabel: PropTypes.string,
    secondaryButtonAction: PropTypes.func,
    secondaryButtonUrl: PropTypes.string,
  },
  buttonType: PropTypes.oneOf(BUTTON_TYPE),
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
    primaryButtonUrl: () => {},
    secondaryButtonLabel: '',
    secondaryButtonAction: () => {},
    secondaryButtonUrl: () => {},
  },
  buttonType: BUTTON_TYPE[0],
  children: null,
  delay: 200,
  description: '',
  theme: TOOLTIP_THEME[0],
  title: '',
  placementAlign: PLACEMENT_ALIGN[0],
  placementSide: PLACEMENT_SIDE[0],
};

export default Tooltip;
