import React from 'react';
import { Loader, Switch } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

export default function O11ySwitcher({
  isShortToggle,
  onChange,
  defaultValue,
  checked,
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
        wrapperClassName="mx-auto fill-brand-500 text-brand-300"
        height="h-4"
        width="h-4"
      />
    </span>
  );

  return (
    <Switch
      isShortToggle={isShortToggle}
      onChange={onChange}
      defaultValue={defaultValue}
      checked={checked}
      disabled={disabled}
      toggleIcons={loading ? loadingToggleIcons : toggleIcons}
    />
  );
}

O11ySwitcher.propTypes = {
  checked: PropTypes.bool,
  isShortToggle: PropTypes.bool,
  onChange: PropTypes.func,
  defaultValue: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  toggleIcons: PropTypes.func
};
O11ySwitcher.defaultProps = {
  checked: undefined,
  isShortToggle: false,
  onChange: null,
  defaultValue: undefined,
  disabled: false,
  loading: false,
  toggleIcons: null
};
