import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { Menu } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';
import PropTypes from 'prop-types';

import { DropdownContextData } from '../../shared/dropdownContext';

import { DROPDOWN_ALIGN, DROPDOWN_SIDE } from './const/dropdownConstants';

import './styles.scss';

const Dropdown = (props) => {
  const { align, children, onClick, side, wrapperClassName } = props;

  return (
    <DropdownContextData.Provider
      value={{
        align,
        onClick,
        side
      }}
    >
      <Popover.Root>
        <Menu
          as="div"
          className={twClassNames(
            'relative flex items-center',
            wrapperClassName
          )}
        >
          {children}
        </Menu>
      </Popover.Root>
    </DropdownContextData.Provider>
  );
};

Dropdown.propTypes = {
  align: PropTypes.oneOf(DROPDOWN_ALIGN),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  side: PropTypes.oneOf(DROPDOWN_SIDE),
  wrapperClassName: PropTypes.string
};
Dropdown.defaultProps = {
  align: DROPDOWN_ALIGN[0],
  onClick: () => {},
  side: DROPDOWN_SIDE[0],
  wrapperClassName: ''
};

export default Dropdown;
