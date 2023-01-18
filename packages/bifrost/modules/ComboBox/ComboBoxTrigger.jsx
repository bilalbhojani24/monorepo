import React from 'react';
import { Combobox } from '@headlessui/react';
import PropTypes from 'prop-types';

import { ChevronUpDownIcon } from '../Icon';

const ComboBoxTrigger = ({ isMulti, selectOptions }) => (
  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
    {isMulti && selectOptions?.length ? (
      <span className="mr-1 font-bold">{`(${selectOptions.length})`}</span>
    ) : null}
    <ChevronUpDownIcon className="text-base-400 h-5 w-5" aria-hidden="true" />
  </Combobox.Button>
);

ComboBoxTrigger.propTypes = {
  isMulti: PropTypes.bool,
  selectOptions: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
        image: PropTypes.string,
      }),
    ),
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  ]),
};

ComboBoxTrigger.defaultProps = {
  isMulti: false,
  selectOptions: null,
};

export default ComboBoxTrigger;
