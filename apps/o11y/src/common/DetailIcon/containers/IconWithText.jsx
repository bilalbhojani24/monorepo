import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { UnknownIcon } from 'assets/icons/components';
import PropTypes from 'prop-types';

import { ICON_LIST } from '../constants';

const IconWithText = ({
  icon,
  text,
  analyticsId,
  iconClass,
  textClass,
  size,
  forSpecInfo
}) => {
  const IconComponent = ICON_LIST[icon] ? ICON_LIST[icon] : UnknownIcon;

  const getWrapperClass = () => {
    let result = '';
    if (forSpecInfo) {
      result = 'gap-2 capitalize text-md';
    } else {
      result = 'text-sm gap-1';
    }
    return result;
  };

  const getIconSizeClass = () => {
    let result = '';
    if (size === 'large') {
      result = 'h-5 w-5';
    } else {
      result = '';
    }
    return result;
  };

  return (
    <div
      className={twClassNames(
        'flex items-center text-center ',
        getWrapperClass()
      )}
      data-analytics-id={analyticsId}
    >
      <IconComponent className={`h-4 w-4 ${getIconSizeClass()} ${iconClass}`} />
      <div
        className={`text-base-500 overflow-hidden text-ellipsis font-normal leading-5 ${textClass}`}
      >
        {text}
      </div>
    </div>
  );
};

IconWithText.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  analyticsId: PropTypes.string,
  iconClass: PropTypes.string,
  textClass: PropTypes.string,
  size: PropTypes.string,
  forSpecInfo: PropTypes.bool
};

IconWithText.defaultProps = {
  analyticsId: '',
  iconClass: '',
  textClass: '',
  size: '',
  forSpecInfo: false
};

export default IconWithText;
