import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Menu } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';
import PropTypes from 'prop-types';

import { DropdownContextData } from '../../shared/dropdownContext';

import RenderChildren from './components/Render';
import { DROPDOWN_ALIGN, DROPDOWN_SIDE } from './const/dropdownConstants';

import './styles.scss';

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);
  const { align, children, onClick, side, wrapperClassName, onOpenChange } =
    props;

  return (
    <DropdownContextData.Provider
      value={{
        align,
        onClick,
        side,
        open,
        setOpen
      }}
    >
      <Popover.Root open={open}>
        <Menu
          as="div"
          className={twClassNames(
            'relative flex items-center',
            wrapperClassName
          )}
        >
          {({ open: dropdownOpen }) => (
            <RenderChildren open={dropdownOpen} onOpenChange={onOpenChange}>
              {children}
            </RenderChildren>
          )}
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
  wrapperClassName: PropTypes.string,
  onOpenChange: PropTypes.func
};
Dropdown.defaultProps = {
  align: DROPDOWN_ALIGN[0],
  onClick: () => {},
  side: DROPDOWN_SIDE[0],
  wrapperClassName: '',
  onOpenChange: null
};

export default Dropdown;
