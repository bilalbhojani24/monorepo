import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import PropTypes from 'prop-types';

import { twClassNames } from '@browserstack/utils';

import './styles.scss';

const Dropdown = (props) => {
  const {
    options,
    trigger,
    headerVisible,
    heading,
    subHeading,
    onClick,
    wrapperClassName
  } = props;

  const handleClick = (e) => {
    onClick(e);
  };

  return (
    <DropdownMenu.Root>
      <div className={wrapperClassName}>
        <DropdownMenu.Trigger>{trigger}</DropdownMenu.Trigger>
      </div>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="divide-base-100 z-10 mt-2 w-56 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          {headerVisible && (
            <div className="px-4 py-3">
              <p className="text-sm">{heading}</p>
              <p className="text-base-900 truncate text-sm font-medium">
                {subHeading}
              </p>
            </div>
          )}
          <div className="py-1">
            {options.map((option, optionIdx) => (
              <DropdownMenu.Item
                key={`${option.body}-${option.id}`}
                className={twClassNames(
                  'border-base-100 text-base-700 hover:bg-base-100 hover:text-base-900 focus:outline-none',
                  {
                    'border-t border-base-100':
                      option.divider === true && optionIdx !== 0
                  }
                )}
              >
                <button
                  onClick={handleClick}
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm"
                >
                  {option.body}
                </button>
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      body: PropTypes.node,
      divider: PropTypes.bool
    })
  ),
  headerVisible: PropTypes.bool,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  onClick: PropTypes.func,
  wrapperClassName: PropTypes.string
};
Dropdown.defaultProps = {
  trigger: 'Dropdown',
  options: [],
  headerVisible: false,
  heading: '',
  subHeading: '',
  onClick: () => {},
  wrapperClassName: ''
};

export default Dropdown;
