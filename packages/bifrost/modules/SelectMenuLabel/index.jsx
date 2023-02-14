import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { Listbox } from '@headlessui/react';

import { node, string } from '../../shared/proptypesConstants';

import './styles.scss';

const SelectMenuLabel = ({ children, wrapperClassName }) => (
  <>
    {children ? (
      <Listbox.Label
        className={twClassNames(
          'text-base-700 mb-1 block text-sm font-medium',
          wrapperClassName
        )}
      >
        {children}
      </Listbox.Label>
    ) : null}
  </>
);

SelectMenuLabel.propTypes = {
  children: node,
  wrapperClassName: string
};
SelectMenuLabel.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default SelectMenuLabel;
