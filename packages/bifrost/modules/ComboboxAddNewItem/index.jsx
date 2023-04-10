import React, { useContext, useId } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import { string } from 'prop-types';

import { ComboboxContextData } from '../../shared/comboboxContext';

const ComboboxAddNewItem = ({ suffix, prefix, wrapperClassName }) => {
  const { query } = useContext(ComboboxContextData);
  const uniqueId = useId();
  return (
    <Combobox.Option
      value={{
        value: `${uniqueId}-${query}`,
        label: query,
        isNew: true
      }}
      className={({ active }) =>
        twClassNames(
          'group relative cursor-pointer select-none py-2 pl-3 pr-9 text-brand-600 border-t-2 border-base-200',
          {
            'bg-brand-600 text-white': active
          },
          wrapperClassName
        )
      }
    >
      {`${prefix} '${query}' ${suffix}`}
    </Combobox.Option>
  );
};

ComboboxAddNewItem.propTypes = {
  suffix: string,
  prefix: string.isRequired,
  wrapperClassName: string
};
ComboboxAddNewItem.defaultProps = {
  suffix: '',
  wrapperClassName: ''
};

export default ComboboxAddNewItem;
