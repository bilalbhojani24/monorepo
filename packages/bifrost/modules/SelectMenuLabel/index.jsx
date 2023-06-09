import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Listbox } from '@headlessui/react';

import { node, string } from '../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../shared/selectMenuContext';

const SelectMenuLabel = ({ children, wrapperClassName }) => {
  const { isMandatory } = useContext(SelectMenuContextData);
  return (
    <>
      {children ? (
        <Listbox.Label
          className={twClassNames(
            'text-base-700 mb-1 block text-sm font-medium',
            wrapperClassName
          )}
        >
          {children}
          {isMandatory && <span className="text-danger-600 ml-0.5">*</span>}
        </Listbox.Label>
      ) : null}
    </>
  );
};

SelectMenuLabel.propTypes = {
  children: node,
  wrapperClassName: string
};
SelectMenuLabel.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default SelectMenuLabel;
