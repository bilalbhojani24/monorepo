import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger
} from '@browserstack/bifrost';

import {
  configurationsSelector,
  setActiveConfigurations
} from '../../../globalSlice';

const SelectConfigurations = () => {
  const dispatch = useDispatch();
  const AllConfigurationsOption = {
    id: 'all',
    body: <p>All</p>
  };
  const configurations = useSelector(configurationsSelector);
  const options = useMemo(
    () =>
      configurations?.map((configuration) => ({
        id: configuration.value,
        body: <p>{configuration.label}</p>
      })) ?? [],
    [configurations]
  );

  const selectConfiguration = (val) => {
    const hasSelectedAllConfigurations = val.id === AllConfigurationsOption.id;

    if (hasSelectedAllConfigurations) {
      dispatch(setActiveConfigurations([...configurations]));
    } else {
      const selectedConfiguration = configurations.find(
        (configuration) => val.id === configuration.value
      );

      dispatch(setActiveConfigurations([selectedConfiguration]));
    }
  };

  return (
    <Dropdown onClick={selectConfiguration}>
      <div className="flex">
        <DropdownTrigger>Configurations</DropdownTrigger>
      </div>
      <DropdownOptionGroup>
        {options?.length > 1 && (
          <DropdownOptionItem
            key={AllConfigurationsOption.value}
            option={AllConfigurationsOption}
          />
        )}
        {options.map((item) => (
          <DropdownOptionItem key={item.value} option={item} />
        ))}
      </DropdownOptionGroup>
    </Dropdown>
  );
};

export default SelectConfigurations;
