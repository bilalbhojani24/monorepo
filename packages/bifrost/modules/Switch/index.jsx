import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import PropTypes from 'prop-types';

import './styles.scss';

const Switch = ({
  isShortToggle,
  leftDescription,
  leftLabel,
  leftSubLabel,
  onChange,
  rightDescription,
  rightLabel,
  rightSubLabel,
  wrapperClassName,
  defaultValue
}) => {
  const [enabled, setEnabled] = useState(defaultValue);

  const onChangeHandler = (updateState) => {
    setEnabled(updateState);
    onChange(updateState);
  };

  return (
    <HeadlessSwitch.Group
      as="div"
      className={twClassNames(
        'flex items-center justify-between',
        wrapperClassName
      )}
    >
      {(leftLabel || leftDescription || leftSubLabel) && (
        <span className="flex grow flex-col pr-3">
          {(leftLabel || leftSubLabel) && (
            <HeadlessSwitch.Label as="span" passive>
              {leftLabel && (
                <span className="text-base-900 mr-2 text-sm font-medium">
                  {leftLabel}
                </span>
              )}
              {leftSubLabel && (
                <span className="text-base-500 text-sm">{leftSubLabel}</span>
              )}
            </HeadlessSwitch.Label>
          )}
          {leftDescription && (
            <HeadlessSwitch.Description
              as="span"
              className="text-base-500 text-sm"
            >
              {leftDescription}
            </HeadlessSwitch.Description>
          )}
        </span>
      )}
      <HeadlessSwitch
        checked={enabled}
        onChange={onChangeHandler}
        className={twClassNames(
          isShortToggle
            ? [
                'group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2'
              ]
            : [
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
                enabled ? 'bg-brand-600' : 'bg-base-200'
              ]
        )}
      >
        <span className="sr-only">Use setting</span>
        {isShortToggle && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute h-full w-full rounded-md bg-white"
            />
            <span
              aria-hidden="true"
              className={twClassNames(
                'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out',
                enabled ? 'bg-brand-600' : 'bg-base-200'
              )}
            />
          </>
        )}
        <span
          aria-hidden="true"
          className={twClassNames(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 duration-200 ease-in-out',
            enabled ? 'translate-x-5' : 'translate-x-0',
            isShortToggle
              ? 'absolute left-0 border border-base-200 transition-transform'
              : 'transition'
          )}
        />
      </HeadlessSwitch>
      {(rightLabel || rightDescription || rightSubLabel) && (
        <span className="flex grow flex-col pl-3">
          {(rightLabel || rightSubLabel) && (
            <HeadlessSwitch.Label as="span">
              {rightLabel && (
                <span className="text-base-900 mr-2 text-sm font-medium">
                  {rightLabel}
                </span>
              )}
              {rightSubLabel && (
                <span className="text-base-500 text-sm">{rightSubLabel}</span>
              )}
            </HeadlessSwitch.Label>
          )}
          {rightDescription && (
            <HeadlessSwitch.Description
              as="span"
              className="text-base-500 text-sm"
            >
              {rightDescription}
            </HeadlessSwitch.Description>
          )}
        </span>
      )}
    </HeadlessSwitch.Group>
  );
};

Switch.propTypes = {
  isShortToggle: PropTypes.bool,
  leftDescription: PropTypes.string,
  leftLabel: PropTypes.string,
  leftSubLabel: PropTypes.string,
  onChange: PropTypes.func,
  rightDescription: PropTypes.string,
  rightLabel: PropTypes.string,
  rightSubLabel: PropTypes.string,
  wrapperClassName: PropTypes.string,
  defaultValue: PropTypes.bool
};
Switch.defaultProps = {
  isShortToggle: false,
  leftDescription: '',
  leftLabel: '',
  leftSubLabel: '',
  onChange: () => {},
  rightDescription: '',
  rightLabel: '',
  rightSubLabel: '',
  wrapperClassName: '',
  defaultValue: false
};

export default Switch;
