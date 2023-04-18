import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import { FILTER_BY } from '../../constants';
import { useNetwork } from '../../state/Context';

const filterByKeys = Object.keys(FILTER_BY);

const RequestTypeFilters = () => {
  const { actions, state } = useNetwork();
  const filter = state.get('filter');

  const [selectedType, setSelectedType] = useState(filterByKeys[0]);
  const dropDownOptions = useMemo(
    () =>
      filterByKeys.map((key) => ({
        label: (
          <div
            className={twClassNames('har-request-type-filters__options', {
              'har-request-type-filters__options--selected':
                key === selectedType
            })}
          >
            {key}
          </div>
        ),
        value: key
      })),
    [selectedType]
  );

  const onChange = ({ value }) => {
    setSelectedType(value);
    actions.updateFilter(FILTER_BY[value]);

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
    if ((!filter.name || !filter.value) && selectedType !== filterByKeys[0]) {
      setSelectedType(filterByKeys[0]);
    }
  }, [filter, selectedType]);

  return (
    <Dropdown
      menuOptions={dropDownOptions}
      title={`${selectedType} ${
        filterByKeys[0] === selectedType ? '' : 'only'
      }`}
      onChange={onChange}
      type="link"
      triggerId="har-request-type-filters-trigger"
      wrapperClassName="har-request-type-filters"
    />
  );
};

export default RequestTypeFilters;
