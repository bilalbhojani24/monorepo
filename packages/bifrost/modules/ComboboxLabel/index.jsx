import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { node, string } from '../../shared/proptypesConstants';

const ComboboxLabel = ({ children, wrapperClassName }) => {
  const { isMandatory } = useContext(ComboboxContextData);
  return (
    <>
      {children ? (
        <Combobox.Label
          className={twClassNames(
            'text-base-700 mb-1 block text-sm font-medium',
            wrapperClassName
          )}
          aria-label="Combobox label"
        >
          {children}
          {isMandatory && <span className="text-danger-600 ml-0.5">*</span>}
        </Combobox.Label>
      ) : null}
    </>
  );
};

ComboboxLabel.propTypes = {
  children: node,
  wrapperClassName: string
};
ComboboxLabel.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default ComboboxLabel;
