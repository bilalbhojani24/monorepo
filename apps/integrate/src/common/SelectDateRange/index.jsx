import React, { useState } from 'react';
import {
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';

const SelectDateRange = () => {
  const configs = [
    { label: 'Last week', value: '1' },
    { label: 'Last month', value: '2' },
    { label: 'Last 6 months', value: '3' }
  ];
  const [activeDateRange, setActiveDateRange] = useState(configs[0]);
  const selectConfiguration = (val) => {
    setActiveDateRange(val);
  };

  return (
    <SelectMenu onChange={selectConfiguration} value={activeDateRange}>
      <SelectMenuTrigger wrapperClassName="w-48 ml-6" />
      <SelectMenuOptionGroup>
        {configs.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  );
};

export default SelectDateRange;
