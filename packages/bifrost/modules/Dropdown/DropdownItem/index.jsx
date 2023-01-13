import React from 'react';
import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const DropdownItem = ({ option, index }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        type="button"
        className={classNames(
          {
            'bg-base-100 text-base-900': active,
            'text-base-700': !active,
            'border-t border-base-100': option.divider === true && index !== 0,
          },
          'block w-full px-4 py-2 text-left text-sm',
        )}
      >
        {option.body}
      </button>
    )}
  </Menu.Item>
);

DropdownItem.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    callback: PropTypes.func,
    divider: PropTypes.bool,
  }),
  index: PropTypes.number,
};
DropdownItem.defaultProps = {
  option: {},
  index: 0,
};

export default DropdownItem;
