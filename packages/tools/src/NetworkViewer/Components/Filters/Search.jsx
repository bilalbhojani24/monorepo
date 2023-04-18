import React, { useEffect, useRef, useState } from 'react';
import { InputField, MdCancel, MdSearch } from '@browserstack/bifrost';

import { useNetwork } from '../../state/Context';

const Search = () => {
  const { state, actions } = useNetwork();
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);

  const currSearch = state.get('search');

  const handleInputChange = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    let timeout;
    if (currSearch !== searchValue) {
      timeout = setTimeout(() => {
        actions.updateSearch({
          value: searchValue,
          isSubset: !!currSearch && searchValue.includes(currSearch)
        });
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [actions, currSearch, searchValue]);

  const handleOnBlur = () => {
    // if (!['automate', 'app_automate'].includes(product)) {
    //   return;
    // }
    // const eventType =
    //   product === 'automate'
    //     ? window.EDS.automateWebEvent
    //     : window.EDS.appAutomateWebEvents;
    // const name = `${product === 'automate' ? 'Atm' : 'AppAtm'}HARViewerSearch`;
    // const eventData = {
    //   team: product,
    //   product,
    //   searchText: searchValue
    // };
    // window.WebEventTracker?.logEvent?.([], eventType, name, eventData);
  };

  return (
    <InputField
      inputRef={searchInputRef}
      id="har-viewer-search"
      onBlur={handleOnBlur}
      leadingIcon={<MdSearch aria-hidden="false" role="img" title="Search" />}
      onChange={handleInputChange}
      placeholder="Filter Logs"
      value={searchValue}
      trailingIcon={
        searchValue.length ? (
          <MdCancel aria-hidden="false" role="img" title="Cancel" />
        ) : null
      }
      onIconClick={() => {
        setSearchValue('');
        searchInputRef.current?.focus();
      }}
    />
  );
};

export default Search;
