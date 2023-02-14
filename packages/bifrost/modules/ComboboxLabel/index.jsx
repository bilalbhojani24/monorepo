import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';

import { node, string } from '../../shared/proptypesConstants';

const ComboboxLabel = ({ children, wrapperClassName }) => (
  <>
    {children ? (
      <Combobox.Label
        className={twClassNames(
          'text-base-700 mb-1 block text-sm font-medium',
          wrapperClassName
        )}
      >
        {children}
      </Combobox.Label>
    ) : null}
  </>
);

ComboboxLabel.propTypes = {
  children: node,
  wrapperClassName: string
};
ComboboxLabel.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default ComboboxLabel;
