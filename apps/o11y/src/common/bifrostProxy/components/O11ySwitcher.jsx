import React from 'react';
import { Loader, Switch } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

export default function O11ySwitcher({
  isShortToggle,
  onChange,
  defaultValue,
  checked,
  wrapperClassName,
  disabled,
  toggleIcons,
  loading
}) {
  const loadingToggleIcons = () => (
    <span
      className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
      aria-hidden="true"
    >
      <Loader
        wrapperStyle="mx-auto fill-brand-500 text-brand-300"
        height="h-4"
        width="h-4"
      />
    </span>
  );
  return (
    <Switch
      isShortToggle={isShortToggle}
      onChange={disabled ? null : onChange}
      defaultValue={defaultValue}
      checked={checked}
      wrapperClassName={twClassNames(wrapperClassName, {
        'bg-base-100 focus:ring-0 focus:ring-offset-0 cursor-not-allowed focus:outline-0':
          disabled
      })}
      toggleIcons={loading ? loadingToggleIcons : toggleIcons}
    />
  );
}

O11ySwitcher.propTypes = {
  checked: PropTypes.bool,
  isShortToggle: PropTypes.bool,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  defaultValue: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  toggleIcons: PropTypes.func
};
O11ySwitcher.defaultProps = {
  checked: undefined,
  isShortToggle: false,
  onChange: null,
  wrapperClassName: '',
  defaultValue: undefined,
  disabled: false,
  loading: false,
  toggleIcons: null
};
