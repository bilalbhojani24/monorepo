import React, { useState } from 'react';
import {
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';

const SelectConfigurations = () => {
  const [activeConfigs, setActiveConfigs] = useState([]);
  const AllConfigurationsOption = {
    label: 'All Configurations',
    value: 'All Configurations'
  };
  const configs = [
    { label: 'Configuration 1', value: '1' },
    { label: 'Configuration 2', value: '2' },
    { label: 'Configuration 3', value: '3' }
  ];
  const selectConfiguration = (val) => {
    const hasSelectAllConfigurations = val?.find(
      (option) => option.value === AllConfigurationsOption.value
    );
    if (hasSelectAllConfigurations) {
      setActiveConfigs([AllConfigurationsOption, ...configs]);
    } else {
      setActiveConfigs((prev) => {
        const deselectedAllConfigurations = prev?.find(
          (option) => option.value === AllConfigurationsOption.value
        );
        if (deselectedAllConfigurations) {
          setActiveConfigs([]);
        } else {
          setActiveConfigs(val);
        }
      });
    }
  };

  return (
    <SelectMenu onChange={selectConfiguration} value={activeConfigs} isMulti>
      <SelectMenuTrigger
        placeholder="All Configurations"
        wrapperClassName="w-48 ml-6"
      />
      <SelectMenuOptionGroup>
        {configs?.length > 1 && (
          <SelectMenuOptionItem
            key={AllConfigurationsOption.value}
            option={AllConfigurationsOption}
          />
        )}
        {configs.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  );
};

export default SelectConfigurations;
