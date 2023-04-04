import React, { useState } from 'react';
import { MdClose, MdSearch } from '@browserstack/bifrost';
import { O11yButton, O11yInputField } from 'common/bifrostProxy';

function TestListSearch() {
  const [searchText, setSearchText] = useState('');
  const handleOnChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);
  };
  const makeNewRequestOnSearchChange = () => {};
  const handleSearchTextChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length && e.key === 'Enter') {
      makeNewRequestOnSearchChange(newValue);
    }
  };
  const clearSearchText = () => {
    setSearchText('');
    makeNewRequestOnSearchChange('');
  };
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
      wrapperClassName="max-w-md w-[28rem]"
      id="build-search-value"
    />
  );
}

export default TestListSearch;
