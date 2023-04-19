import React, { useEffect, useMemo, useState } from 'react';
import {
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';

import { FILTER_BY } from '../../constants';
import { useNetwork } from '../../state/Context';

const filterByKeys = Object.keys(FILTER_BY);

const RequestTypeFilters = () => {
  const { state, actions } = useNetwork();
  const filter = state.get('filter');

  const [selectedType, setSelectedType] = useState({
    label: filterByKeys[0],
    value: filterByKeys[0]
  });
  const dropDownOptions = useMemo(
    () =>
      filterByKeys.map((key) => ({
        label: key,
        value: key
      })),
    []
  );

  const onChange = (item) => {
    setSelectedType(item);
    actions.updateFilter(FILTER_BY[item.value]);

    // if (!['automate', 'app_automate'].includes(product)) {
    //   return;
    // }
    // const eventType =
    //   product === 'automate'
    //     ? window.EDS.automateWebEvent
    //     : window.EDS.appAutomateWebEvents;
    // const name = `${
    //   product === 'automate' ? 'Atm' : 'AppAtm'
    // }HARViewerOnFilterChange`;
    // const eventData = {
    //   team: product,
    //   product,
    //   requestTypeSelected: value
    // };
    // window.WebEventTracker?.logEvent?.([], eventType, name, eventData);
  };
  useEffect(() => {
    // handling reset filter case with this effect
    if (
      (!filter.name || !filter.value) &&
      selectedType.label !== filterByKeys[0]
    ) {
      setSelectedType({
        label: filterByKeys[0],
        value: filterByKeys[0]
      });
    }
  }, [filter, selectedType]);

  return (
    <SelectMenu onChange={onChange} value={selectedType || dropDownOptions[0]}>
      <SelectMenuTrigger
        placeholder="Select Request Type"
        wrapperClassName="w-52"
      />
      <SelectMenuOptionGroup>
        {dropDownOptions.map((item) => (
          <SelectMenuOptionItem
            key={item.value.toString()}
            option={item}
            checkPosition="right"
          />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  );
};

export default RequestTypeFilters;
