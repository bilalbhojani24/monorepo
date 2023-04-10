import React, { Fragment, useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox, Transition } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { node, oneOf, string } from '../../shared/proptypesConstants';
import { OPTION_GROUP_ALIGNMENT } from '../ComboBox/const/comboBoxConstants';
import ComboboxAddNewItem from '../ComboboxAddNewItem';
import ComboboxOptionItem from '../ComboboxOptionItem';

const ComboboxOptionGroup = ({
  alignment,
  children,
  wrapperClassName,
  maxWidth
}) => {
  const { width, query } = useContext(ComboboxContextData);

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
            {children.length === 0 ? (
              <>
                {children}
                <ComboboxOptionItem
                  isEmpty
                  emptyText={
                    query.length > 0
                      ? 'No results found'
                      : 'No options available'
                  }
                  disabled
                />
                {query.length > 0 && (
                  <ComboboxAddNewItem
                    suffix="as a new option (↵)"
                    prefix="Add"
                  />
                )}
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
  wrapperClassName: string
};

ComboboxOptionGroup.defaultProps = {
  alignment: OPTION_GROUP_ALIGNMENT[0],
  maxWidth: '80vw',
  wrapperClassName: ''
};

export default ComboboxOptionGroup;
