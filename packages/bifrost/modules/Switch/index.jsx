import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import PropTypes from 'prop-types';

import './styles.scss';

const Switch = ({
  isShortToggle,
  onChange,
  defaultValue,
  checked,
  wrapperClassName,
  toggleIcons
}) => {
  const onChangeHandler = (updateState) => {
    onChange?.(updateState);
  };

  return (
    <HeadlessSwitch
      checked={checked}
      defaultChecked={defaultValue}
      onChange={onChangeHandler}
      className={({ checked: headlessChecked }) =>
        twClassNames(
          isShortToggle
            ? [
                'group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2'
              ]
            : [
                'bg-base-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
                headlessChecked ? 'bg-brand-600' : 'bg-base-200'
              ],
          wrapperClassName
        )
      }
    >
      {({ checked: headlessChecked }) => (
        <>
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
                  headlessChecked ? 'bg-brand-600' : 'bg-base-200'
                )}
              />
            </>
          )}
          <span
            aria-hidden="true"
            className={twClassNames(
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 duration-200 ease-in-out',
              headlessChecked ? 'translate-x-5' : 'translate-x-0',
              isShortToggle
                ? 'absolute left-0 border border-base-200 transition-transform'
                : 'transition'
            )}
          >
            {toggleIcons?.(checked)}
          </span>
        </>
      )}
    </HeadlessSwitch>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool,
  isShortToggle: PropTypes.bool,
  toggleIcons: PropTypes.func,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  defaultValue: PropTypes.bool
};
Switch.defaultProps = {
  checked: undefined,
  isShortToggle: false,
  toggleIcons: null,
  onChange: null,
  wrapperClassName: '',
  defaultValue: undefined
};

export default Switch;
