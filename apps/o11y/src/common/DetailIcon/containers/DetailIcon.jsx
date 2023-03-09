import React from 'react';
import PropTypes from 'prop-types';

import IconWithText from './IconWithText';

const DetailIcon = ({ icon, text, forSpecInfo, size }) => {
  const getIconClass = () => {
    let iconClass = '';
    if (text && icon !== 'device_icon') {
      if (text.toLowerCase().indexOf('samsung') !== -1)
        iconClass = 'w-[42px] h-5';
      else if (
        text.toLowerCase().indexOf('vivo') !== -1 ||
        text.toLowerCase().indexOf('oppo') !== -1
      )
        iconClass = 'h-3 w-8';
    } else {
      iconClass = '';
    }
    return iconClass;
  };

  return (
    <IconWithText
      icon={icon}
      text={text.indexOf('ios') !== -1 ? text.replace('ios', 'iOS') : text}
      forSpecInfo={forSpecInfo}
      iconClass={getIconClass()}
      textClass={`${
        text &&
        (text.toLowerCase().indexOf('ios') !== -1 ||
        text.toLowerCase().indexOf('iphone') !== -1
          ? 'normal-case'
          : '')
      }`}
      size={size}
    />
  );
};

DetailIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  forSpecInfo: PropTypes.bool,
  size: PropTypes.string
};

DetailIcon.defaultProps = {
  text: '',
  forSpecInfo: false,
  size: ''
};

export default DetailIcon;
