import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';

import {
  activeConfigurationsSelector,
  configurationsSelector,
  setActiveConfigurations
} from '../../../globalSlice';

const SelectConfigurations = () => {
  const dispatch = useDispatch();
  const AllConfigurationsOption = {
    label: 'All Configurations',
    value: 'All Configurations'
  };
  const configurations = useSelector(configurationsSelector);
  const activeConfigurations = useSelector(activeConfigurationsSelector);

  const selectConfiguration = (val) => {
    const hasSelectAllConfigurations = val?.find(
      (option) => option.value === AllConfigurationsOption.value
    );
    if (hasSelectAllConfigurations) {
      dispatch(
        setActiveConfigurations([AllConfigurationsOption, ...configurations])
      );
    } else {
      const deselectedAllConfigurations = activeConfigurations?.find(
        (option) => option.value === AllConfigurationsOption.value
      );
      if (deselectedAllConfigurations) {
        dispatch(setActiveConfigurations([]));
      } else {
        dispatch(setActiveConfigurations(val));
      }
    }
  };

  return (
    <SelectMenu
      onChange={selectConfiguration}
      value={activeConfigurations}
      isMulti
    >
      <SelectMenuTrigger
        placeholder="All Configurations"
        wrapperClassName="w-48 ml-6"
      />
      <SelectMenuOptionGroup>
        {configurations?.length > 1 && (
          <SelectMenuOptionItem
            key={AllConfigurationsOption.value}
            option={AllConfigurationsOption}
          />
        )}
        {configurations.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  );
};

export default SelectConfigurations;
