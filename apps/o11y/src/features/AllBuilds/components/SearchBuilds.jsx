import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MdClose, MdSearch } from '@browserstack/bifrost';
import { O11yInputField } from 'common/bifrostProxy';

import {
  getBuildsData,
  setAppliedFilters,
  setBuilds
} from '../slices/dataSlice';

const SearchBuilds = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const { projectNormalisedName } = useParams();
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);
    dispatch(
      setAppliedFilters({
        searchText: newValue.toLowerCase()
      })
    );
  };
  const handleSearchTextChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length && e.key === 'Enter') {
      dispatch(setBuilds({ builds: [], buildsPagingParams: {} }));
      dispatch(
        getBuildsData({
          projectNormalisedName,
          currentPagingParams: {}
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
    dispatch(setBuilds({ builds: [], buildsPagingParams: {} }));
    dispatch(
      getBuildsData({
        projectNormalisedName,
        currentPagingParams: {}
      })
    );
  };

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
        wrapperClassName="max-w-md"
      />
    </>
  );
};

export default SearchBuilds;
