import React, { useEffect, useRef, useState } from 'react';
import { Button, InputField, MdClose, MdSearch } from '@browserstack/bifrost';

import { useNetwork } from '../../state/Context';

const Search = () => {
  const { state, actions } = useNetwork();
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);

  const currSearch = state.get('search');

  const handleInputChange = ({ target: { value } }) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (!currSearch) {
      setSearchValue('');
    }
  }, [currSearch]);

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
      addOnBeforeInline={
        <MdSearch
          aria-hidden="false"
          role="img"
          title="Search"
          className="text-base-500 text-xl"
        />
      }
      onChange={handleInputChange}
      placeholder="Search in logs"
      value={searchValue}
      addOnAfterInline={
        searchValue.length ? (
          <Button
            variant="minimal"
            colors="white"
            icon={<MdClose className="text-lg" />}
            onClick={() => {
              setSearchValue('');
              searchInputRef.current?.focus();
            }}
            isIconOnlyButton
            size="extra-small"
          />
        ) : null
      }
    />
  );
};

export default Search;
