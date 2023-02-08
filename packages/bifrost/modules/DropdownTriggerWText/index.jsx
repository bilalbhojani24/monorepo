import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import { ChevronDownIcon } from '../Icon';

import './styles.scss';

const DropdownTriggerWText = ({ children, wrapperClassName }) => (
  <div>
    <div
      className={twClassNames(
        'border-base-300 text-base-700 hover:bg-base-50 focus:ring-brand-500 focus:ring-offset-base-100 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
        wrapperClassName
      )}
    >
      {children}
      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
    </div>
  </div>
);

DropdownTriggerWText.propTypes = {
  wrapperClassName: PropTypes.string,
  children: PropTypes.node
};
DropdownTriggerWText.defaultProps = {
  wrapperClassName: '',
  children: null
};

export default DropdownTriggerWText;
