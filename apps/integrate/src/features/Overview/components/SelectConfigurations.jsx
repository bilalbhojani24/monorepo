import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  MdCheck
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import {
  activeConfigurationsSelector,
  configurationsSelector,
  setActiveConfigurations
} from '../../../globalSlice';

const SelectConfigurations = () => {
  const dispatch = useDispatch();

  const activeConfigurations = useSelector(activeConfigurationsSelector);
  const getIsConfigurationSelected = useCallback(
    (configuration) => {
      if (activeConfigurations?.length > 1 && configuration.value === 'all') {
        return true;
      }
      return !!(
        activeConfigurations?.length === 1 &&
        configuration.value === activeConfigurations[0].value
      );
    },
    [activeConfigurations]
  );

  const AllConfigurationsOption = {
    id: 'all',
    body: (
      <p className="flex">
        <p className="mr-2 w-4">
          {getIsConfigurationSelected({ value: 'all' }) && (
            <MdCheck className="text-brand-500 mr-1 text-xl" />
          )}
        </p>
        <span
          className={twClassNames({
            'font-bold': getIsConfigurationSelected({ value: 'all' })
          })}
        >
          All
        </span>
      </p>
    )
  };
  const configurations = useSelector(configurationsSelector);
  const options = useMemo(
    () =>
      configurations?.map((configuration) => ({
        id: configuration.value,
        body: (
          <p className="flex">
            <p className="mr-2 w-4">
              {getIsConfigurationSelected(configuration) && (
                <MdCheck className="text-brand-500 text-xl" />
              )}
            </p>

            <span
              className={twClassNames('overflow-hidden truncate', {
                'font-bold': getIsConfigurationSelected(configuration)
              })}
            >
              {configuration.label}
            </span>
          </p>
        )
      })) ?? [],
    [configurations, getIsConfigurationSelected]
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
