import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdSearch } from '@browserstack/bifrost';
import { O11yButton, O11yInputField } from 'common/bifrostProxy';

import { BUILD_FILTER_OPERATIONS, BUILD_FILTER_TYPES } from '../constants';
import { findAppliedFilterByType } from '../slices/buildsSelectors';
import { setAppliedFilter } from '../slices/buildsSlice';

const SearchBuilds = () => {
  const dispatch = useDispatch();
  const appliedSearchText = useSelector(
    findAppliedFilterByType(BUILD_FILTER_TYPES.search)
  );

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setSearchText(appliedSearchText?.text || '');
  }, [appliedSearchText?.text]);

  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);
  };

  const handleSearch = () => {
    dispatch(
      setAppliedFilter({
        type: BUILD_FILTER_TYPES.search,
        id: searchText.toLowerCase(),
        operation: BUILD_FILTER_OPERATIONS.REPLACE_BY_TYPE,
        text: searchText,
        isApplied: true
      })
    );
  };

  const handleRemoveSearch = () => {
    setSearchText('');
    dispatch(
      setAppliedFilter({
        type: BUILD_FILTER_TYPES.search,
        operation: BUILD_FILTER_OPERATIONS.REMOVE_BY_TYPE
      })
    );
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
              onClick={handleRemoveSearch}
              isIconOnlyButton
              size="extra-small"
            />
          ) : null
        }
        addOnBeforeInline={<MdSearch className="text-base-400 text-lg" />}
        placeholder="Search builds by name or CI number"
        onKeyDown={handleInputKeyPress}
        onChange={handleOnChange}
        wrapperClassName="max-w-md w-80 bg-white"
        id="all-search-value"
      />
    </>
  );
};

export default SearchBuilds;
