import React from 'react';
import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const DropdownItem = ({ option, index, callback }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        onClick={callback}
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
    divider: PropTypes.bool,
  }),
  index: PropTypes.number,
  callback: PropTypes.func,
};
DropdownItem.defaultProps = {
  option: {},
  index: 0,
  callback: () => {},
};

export default DropdownItem;
