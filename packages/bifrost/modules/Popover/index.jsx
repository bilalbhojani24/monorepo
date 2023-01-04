import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_TYPE, PLACEMENT_ALIGN, PLACEMENT_SIDE, TOOLTIP_THEME } from '../SharedTooltipPopover/const';
import Layout from '../SharedTooltipPopover/component/Layout';
import PopoverContainer from '../PopoverContainer';

import './styles.scss';

const Popover = (props) => {
  const { actionObject, buttonType, children, description, theme, title, placementAlign, placementSide } = props;
  return (
    <PopoverContainer
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
      arrowClassName={theme === TOOLTIP_THEME[1] ? 'dark-arrow' : ''}
    >
      {children}
    </PopoverContainer>
  );
};

Popover.propTypes = {
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
  description: PropTypes.string,
  theme: PropTypes.oneOf(TOOLTIP_THEME),
  title: PropTypes.string,
  placementAlign: PropTypes.oneOf(PLACEMENT_ALIGN),
  placementSide: PropTypes.oneOf(PLACEMENT_SIDE),
};

Popover.defaultProps = {
  actionObject: {
    primaryButtonLabel: '',
    primaryButtonAction: () => {},
    primaryButtonUrl: '',
    secondaryButtonLabel: '',
    secondaryButtonAction: () => {},
    secondaryButtonUrl: '',
  },
  buttonType: BUTTON_TYPE[0],
  children: null,
  description: '',
  theme: TOOLTIP_THEME[0],
  title: '',
  placementAlign: PLACEMENT_ALIGN[0],
  placementSide: PLACEMENT_SIDE[0],
};

export default Popover;
