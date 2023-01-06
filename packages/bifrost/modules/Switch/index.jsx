import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Switch as HeadlessSwitch } from '@headlessui/react';
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
  wrapperClassName
}) => {
  const [enabled, setEnabled] = useState(false);

  const onChangeHandler = (updateState) => {
    setEnabled(updateState);
    onChange(updateState);
  };

  return (
    <HeadlessSwitch.Group as="div" className={classNames('flex items-center justify-between', wrapperClassName)}>
      {(leftLabel || leftDescription || leftSubLabel) && (
        <span className="flex flex-grow flex-col pr-3">
          {(leftLabel || leftSubLabel) && (
            <HeadlessSwitch.Label as="span" passive>
              {leftLabel && <span className="text-sm font-medium text-base-900 mr-2">{leftLabel}</span>}
              {leftSubLabel && <span className="text-sm text-base-500">{leftSubLabel}</span>}
            </HeadlessSwitch.Label>
          )}
          {leftDescription && (
            <HeadlessSwitch.Description as="span" className="text-sm text-base-500">
              {leftDescription}
            </HeadlessSwitch.Description>
          )}
        </span>
      )}
      <HeadlessSwitch
        checked={enabled}
        onChange={onChangeHandler}
        className={classNames(
          isShortToggle
            ? [
                'group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              ]
            : [
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                enabled ? 'bg-indigo-600' : 'bg-base-200'
              ]
        )}
      >
        <span className="sr-only">Use setting</span>
        {isShortToggle && (
          <>
            <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
            <span
              aria-hidden="true"
              className={classNames(
                'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out',
                enabled ? 'bg-indigo-600' : 'bg-base-200'
              )}
            />
          </>
        )}
        <span
          aria-hidden="true"
          className={classNames(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 duration-200 ease-in-out',
            enabled ? 'translate-x-5' : 'translate-x-0',
            isShortToggle ? 'absolute left-0 border border-base-200 transition-transform' : 'transition'
          )}
        />
      </HeadlessSwitch>
      {(rightLabel || rightDescription || rightSubLabel) && (
        <span className="flex flex-grow flex-col pl-3">
          {(rightLabel || rightSubLabel) && (
            <HeadlessSwitch.Label as="span">
              {rightLabel && <span className="text-sm font-medium text-base-900 mr-2">{rightLabel}</span>}
              {rightSubLabel && <span className="text-sm text-base-500">{rightSubLabel}</span>}
            </HeadlessSwitch.Label>
          )}
          {rightDescription && (
            <HeadlessSwitch.Description as="span" className="text-sm text-base-500">
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
  wrapperClassName: PropTypes.string
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
  wrapperClassName: ''
};

export default Switch;
