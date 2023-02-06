import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import PropTypes from 'prop-types';

import { twClassNames } from '../../../utils/tailwindUtils';

const DropdownItem = ({ option, index, callback }) => (
  <DropdownMenu.Item
    className={twClassNames(
      'border-base-100 text-base-700 hover:bg-base-100 hover:text-base-900 focus:outline-none',
      {
        'border-t border-base-100': option.divider === true && index !== 0
      }
    )}
  >
    <button
      onClick={callback}
      type="button"
      className="block w-full px-4 py-2 text-left text-sm"
    >
      {option.body}
    </button>
  </DropdownMenu.Item>
);

DropdownItem.propTypes = {
  option: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    divider: PropTypes.bool
  }),
  index: PropTypes.number,
  callback: PropTypes.func
};
DropdownItem.defaultProps = {
  option: {},
  index: 0,
  callback: () => {}
};

export default DropdownItem;
