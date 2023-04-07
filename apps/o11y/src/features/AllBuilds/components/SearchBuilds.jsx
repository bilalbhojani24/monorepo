import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdSearch } from '@browserstack/bifrost';
import { O11yButton, O11yInputField } from 'common/bifrostProxy';

import { setAppliedFilters } from '../slices/dataSlice';
import { getSearchTextFilters } from '../slices/selectors';

const SearchBuilds = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const searchTextRedux = useSelector(getSearchTextFilters);
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);
  };
  const handleSearchTextChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length && e.key === 'Enter') {
      dispatch(
        setAppliedFilters({
          searchText: newValue
        })
      );
    }
  };
  const clearSearchText = () => {
    setSearchText('');
    dispatch(
      setAppliedFilters({
        searchText: ''
      })
    );
  };

  useEffect(() => {
    setSearchText(searchTextRedux);
  }, [searchTextRedux]);

  return (
    <>
      <O11yInputField
        value={searchText}
        addOnAfterInline={
          searchText.length ? (
            <O11yButton
              variant="minimal"
              colors="white"
              icon={<MdClose className="text-lg" />}
              onClick={clearSearchText}
              isIconOnlyButton
              size="extra-small"
            />
          ) : null
        }
        addOnBeforeInline={<MdSearch className="text-base-400 text-lg" />}
        placeholder="Search builds by name or CI number"
        onKeyDown={handleSearchTextChange}
        onChange={handleOnChange}
        wrapperClassName="max-w-md w-80 bg-white"
        id="all-search-value"
      />
    </>
  );
};

export default SearchBuilds;
