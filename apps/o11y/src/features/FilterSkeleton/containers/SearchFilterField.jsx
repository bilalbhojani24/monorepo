import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose, MdSearch } from '@browserstack/bifrost';
import { O11yButton, O11yInputField } from 'common/bifrostProxy';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';
import { findAppliedFilterByType } from 'features/FilterSkeleton/slices/selectors';
import PropTypes from 'prop-types';

import { ADV_FILTER_TYPES, FILTER_OPERATION_TYPE } from '../constants';

const FILTER_FIELD_TYPE = ADV_FILTER_TYPES.search.key;

const SearchFilterField = ({ id, placeholder, onSearch }) => {
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
        operationType: FILTER_OPERATION_TYPE.ADD_OPERATION,
        text: searchText,
        value: searchText,
        isApplied: true
      })
    );
    onSearch();
  };

  const handleRemoveSearch = () => {
    setSearchText('');
    dispatch(
      setAppliedFilter({
        type: FILTER_FIELD_TYPE,
        operationType: FILTER_OPERATION_TYPE.REMOVE_OPERATION,
        text: '',
        value: '',
        isApplied: false
      })
    );
    onSearch();
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
  placeholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func
};

SearchFilterField.defaultProps = {
  onSearch: () => {}
};

export default SearchFilterField;
