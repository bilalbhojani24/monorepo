import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdSearch } from '@browserstack/bifrost';
import { O11yInputField } from 'common/bifrostProxy';

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
        trailingIcon={
          searchText.length ? <MdClose onClick={clearSearchText} /> : null
        }
        leadingIcon={<MdSearch />}
        placeholder="Search builds by name or CI number"
        isTrailingNodeClickable={!!searchText.length}
        onKeyDown={handleSearchTextChange}
        onChange={handleOnChange}
        wrapperClassName="max-w-md w-[28rem]"
      />
    </>
  );
};

export default SearchBuilds;
