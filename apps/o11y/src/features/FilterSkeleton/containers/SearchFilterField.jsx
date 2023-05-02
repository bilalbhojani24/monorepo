import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdSearch } from '@browserstack/bifrost';
import { O11yButton, O11yInputField } from 'common/bifrostProxy';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';
import { findAppliedFilterByType } from 'features/FilterSkeleton/slices/selectors';
import PropTypes from 'prop-types';

import { ADV_FILTER_TYPES } from '../constants';

const FILTER_FIELD_TYPE = ADV_FILTER_TYPES.search.key;

const SearchFilterField = ({ id, placeholder }) => {
  const dispatch = useDispatch();
  const appliedSearchText = useSelector(
    findAppliedFilterByType(FILTER_FIELD_TYPE)
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
        type: FILTER_FIELD_TYPE,
        id: `${FILTER_FIELD_TYPE}:${searchText.toLowerCase()}`,
        operationType: 'addOperation',
        text: searchText,
        value: searchText,
        isApplied: true
      })
    );
  };

  const handleRemoveSearch = () => {
    setSearchText('');
    dispatch(
      setAppliedFilter({
        type: FILTER_FIELD_TYPE,
        operationType: 'removeOperation',
        text: '',
        value: '',
        isApplied: false
      })
    );
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
            onClick={handleRemoveSearch}
            isIconOnlyButton
            size="extra-small"
          />
        ) : null
      }
      addOnBeforeInline={<MdSearch className="text-base-400 text-lg" />}
      placeholder={placeholder}
      onKeyDown={handleInputKeyPress}
      onChange={handleOnChange}
      wrapperClassName="max-w-md w-80 bg-white"
      id={id}
    />
  );
};

SearchFilterField.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default SearchFilterField;
