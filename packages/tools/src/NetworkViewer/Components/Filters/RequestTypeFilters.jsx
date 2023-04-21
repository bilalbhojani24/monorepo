import React, { useEffect, useMemo, useState } from 'react';
import {
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';

import { FILTER_BY } from '../../constants';
import { NL_EVENTS } from '../../nlEvents';
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
    window.pubSub.publish(NL_EVENTS.NL_PUBSUB_EVENT_NAME, {
      event: NL_EVENTS.FILTER_CHANGED,
      data: item
    });
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
