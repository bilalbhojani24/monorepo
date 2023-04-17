import React, { Fragment, useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox, Transition } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { node, oneOf, string } from '../../shared/proptypesConstants';
import { OPTION_GROUP_ALIGNMENT } from '../ComboBox/const/comboBoxConstants';

const ComboboxOptionGroup = ({
  alignment,
  children,
  wrapperClassName,
  maxWidth,
  addNewItemComponent
}) => {
  const { width, query, isBadge, noResultFoundText } =
    useContext(ComboboxContextData);

  return (
    <Popover.Portal>
      <Popover.Content
        asChild
        style={{
          minWidth: `${width}px`,
          maxWidth
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        align={alignment}
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
              'border-base-200 z-50 my-1 max-h-60 w-full overflow-scroll rounded-md border bg-white shadow-lg outline-none',
              wrapperClassName
            )}
          >
            {!isBadge ? (
              <>
                {children}
                {children.length === 0 && (
                  <Combobox.Option
                    disabled
                    className={twClassNames(
                      'text-base-500 group relative cursor-pointer select-none py-2 pr-9 pl-3'
                    )}
                  >
                    {noResultFoundText ||
                      (query.length > 0
                        ? 'No results found'
                        : 'No options available')}
                  </Combobox.Option>
                )}
                {addNewItemComponent}
              </>
            ) : (
              children
            )}
          </Combobox.Options>
        </Transition>
      </Popover.Content>
    </Popover.Portal>
  );
};

ComboboxOptionGroup.propTypes = {
  alignment: oneOf(OPTION_GROUP_ALIGNMENT),
  children: node.isRequired,
  maxWidth: string,
  addNewItemComponent: node,
  wrapperClassName: string
};

ComboboxOptionGroup.defaultProps = {
  alignment: OPTION_GROUP_ALIGNMENT[0],
  maxWidth: '80vw',
  addNewItemComponent: null,
  wrapperClassName: ''
};

export default ComboboxOptionGroup;
