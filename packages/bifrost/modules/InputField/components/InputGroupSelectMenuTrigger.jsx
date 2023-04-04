import React from 'react';

import { ChevronDownIcon } from '../../Icon';
import SelectMenuTrigger from '../../SelectMenuTrigger';

const InputGroupSelectMenuTrigger = (props) => (
  <SelectMenuTrigger
    placeholder="Select.."
    wrapperClassName="border-0 w-max focus:ring-0  shadow-none"
    triggerIcon={<ChevronDownIcon className="h-5 w-5" />}
    {...props}
  />
);

export default InputGroupSelectMenuTrigger;
