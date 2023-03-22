import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { MdClose, MdSearch } from '@browserstack/bifrost';
import { O11yInputField } from 'common/bifrostProxy';

function TestListSearch() {
  // const dispatch = useDispatch();
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
  );
}

export default TestListSearch;
