import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yCheckbox } from 'common/bifrostProxy';
import { setSelectedFilters } from 'features/FilterSkeleton/slices/filterSlice';
import { getSelectedFilterByBooleanType } from 'features/FilterSkeleton/slices/selectors';
import PropTypes from 'prop-types';

const SingleSelectCheckboxFilter = ({ type, label, inputLabel, id }) => {
  const dispatch = useDispatch();
  const storedValue = useSelector(getSelectedFilterByBooleanType(type));

  const handleChange = () => {
    if (storedValue?.value) {
      dispatch(
        setSelectedFilters({
          type,
          operationType: 'removeOperation',
          id,
          text: null,
          value: null
        })
      );
    } else {
      dispatch(
        setSelectedFilters({
          type,
          operationType: 'addOperation',
          id,
          text: true,
          value: true
        })
      );
    }
  };

  return (
    <div className="">
      <p className="text-base-700 mb-2 text-sm font-medium leading-5">
        {label}
      </p>
      <O11yCheckbox
        border={false}
        checked={storedValue?.value}
        data={{
          label: inputLabel,
          value: `${id}-true`
        }}
        onChange={handleChange}
        wrapperClassName="mb-1"
      />
    </div>
  );
};
SingleSelectCheckboxFilter.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default SingleSelectCheckboxFilter;
