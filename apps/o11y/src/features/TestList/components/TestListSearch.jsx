import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdSearch } from '@browserstack/bifrost';
import { O11yButton, O11yInputField } from 'common/bifrostProxy';
import { getSearchTextFilters } from 'features/TestList/slices/selectors';
import { setAppliedFilters } from 'features/TestList/slices/testListSlice';

function TestListSearch() {
  const dispatch = useDispatch();
  const searchTextRedux = useSelector(getSearchTextFilters);
  const [searchText, setSearchText] = useState('');
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);
  };

  const handleSearchTextChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length && e.key === 'Enter') {
      dispatch(
        setAppliedFilters({
          search: newValue
        })
      );
    }
  };
  const clearSearchText = () => {
    setSearchText('');
    dispatch(
      setAppliedFilters({
        search: ''
      })
    );
  };

  useEffect(() => {
    setSearchText(searchTextRedux);
  }, [searchTextRedux]);

  return (
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
      wrapperClassName="max-w-md w-80 z-0"
      id="build-search-value"
    />
  );
}

export default TestListSearch;
