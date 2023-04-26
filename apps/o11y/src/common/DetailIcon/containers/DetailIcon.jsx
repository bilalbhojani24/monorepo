import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yTooltip } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { BROWSERS_ICON_LIST } from '../constants';

import IconWithText from './IconWithText';

const DetailIcon = ({
  icon,
  text,
  forSpecInfo,
  size,
  openTextInTooltip,
  tooltipTheme
}) => {
  const getIconClass = () => {
    let iconClass = '';
    if (text && icon !== 'device_icon' && !BROWSERS_ICON_LIST.includes(icon)) {
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

  if (!openTextInTooltip) {
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
  }

  return (
    <O11yTooltip
      placementSide="top"
      placementAlign="center"
      wrapperClassName="p-3"
      theme={tooltipTheme}
      content={
        <span
          className={twClassNames(
            'text-base-500 text-sm font-normal leading-5',
            { 'text-white': tooltipTheme === 'dark' }
          )}
        >
          {text.indexOf('ios') !== -1 ? text.replace('ios', 'iOS') : text}
        </span>
      }
    >
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
        openTextInTooltip={openTextInTooltip}
      />
    </O11yTooltip>
  );
};

DetailIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  forSpecInfo: PropTypes.bool,
  size: PropTypes.string,
  tooltipTheme: PropTypes.string,
  openTextInTooltip: PropTypes.bool
};

DetailIcon.defaultProps = {
  text: '',
  forSpecInfo: false,
  size: '',
  tooltipTheme: 'dark',
  openTextInTooltip: false
};

export default DetailIcon;
