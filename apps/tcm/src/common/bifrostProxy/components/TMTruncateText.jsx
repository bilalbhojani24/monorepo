/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TruncateText } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TMTruncateText = (props) => {
  const { ignoreClickAndWrapText } = props;
  const customProp = {};

  const ignoreClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (ignoreClickAndWrapText) {
    customProp.tooltipContent = (
      <div
        className="text-base-300  mb-0 px-4"
        onClick={ignoreClick}
        onKeyDown={ignoreClick}
        role="textbox"
        tabIndex={0}
      >
        {props.children}
      </div>
    );
    customProp.headerTooltipProps = {
      ...props.headerTooltipProps,
      wrapperClassName: 'break-words'
    };
  }
  return <TruncateText {...props} {...customProp} />;
};

TMTruncateText.propTypes = {
  ignoreClickAndWrapText: PropTypes.bool,
  children: PropTypes.node,
  headerTooltipProps: PropTypes.shape(PropTypes.object)
};

TMTruncateText.defaultProps = {
  ignoreClickAndWrapText: false,
  children: null,
  headerTooltipProps: {}
};

export default TMTruncateText;
