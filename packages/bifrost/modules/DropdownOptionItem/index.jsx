import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Menu } from '@headlessui/react';
import PropTypes from 'prop-types';

import { DropdownContextData } from '../../shared/dropdownContext';

const DropdownOptionItem = ({ option, wrapperClassName }) => {
  const dropdownCtx = useContext(DropdownContextData);
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          key={option.id}
          type="button"
          className={twClassNames(
            active ? 'bg-base-100 text-base-900' : 'text-base-700',
            'block px-4 py-2 text-sm w-full text-left',
            wrapperClassName
          )}
          onClick={(e) => {
            dropdownCtx?.onClick?.(option, e);
          }}
        >
          {option.body}
        </button>
      )}
    </Menu.Item>
  );
};

DropdownOptionItem.propTypes = {
  option: PropTypes.shape({
    body: PropTypes.node,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,
  wrapperClassName: PropTypes.string
};
DropdownOptionItem.defaultProps = {
  wrapperClassName: ''
};

export default DropdownOptionItem;
