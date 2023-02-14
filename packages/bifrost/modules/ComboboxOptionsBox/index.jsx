import React, { Fragment, useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox, Transition } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { node, string } from '../../shared/proptypesConstants';

import './styles.scss';

const ComboboxOptionsBox = ({ children, wrapperClassName }) => {
  const { width } = useContext(ComboboxContextData);
  return (
    <Popover.Portal forceMount>
      <Popover.Content
        asChild
        style={{
          width: `${width}px`
        }}
      >
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options
            static
            className={twClassNames(
              'divide-base-100 border-base-200 z-50 my-1 max-h-60 w-full divide-y overflow-scroll rounded-md border bg-white shadow-lg outline-none',
              wrapperClassName
            )}
          >
            {children}
          </Combobox.Options>
        </Transition>
      </Popover.Content>
    </Popover.Portal>
  );
};

ComboboxOptionsBox.propTypes = {
  children: node.isRequired,
  wrapperClassName: string
};
ComboboxOptionsBox.defaultProps = {
  wrapperClassName: ''
};

export default ComboboxOptionsBox;
